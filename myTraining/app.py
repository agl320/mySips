from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from firebase_admin import auth
import numpy as np
from PIL import Image
import cv2
import sys
from pathlib import Path
import pytesseract
from fuzzywuzzy import fuzz

import spacy

from calculations.data_calculations import STATISTIC_FUNCTIONS
from firebase.setup import get_firestore_client

from NER.image_preprocessing import preprocess_image, extract_drink_name_from_text

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

logging.basicConfig(level=logging.INFO)

nlp = spacy.load("./NER/output/model-best") 

# initialize flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# firestore client
db = get_firestore_client()

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    return response

@app.route('/api/user-drink-data/stats', methods=['GET'])
def get_user_drinks():
    try:
        logging.info("debug:")

        # extract auth header
        header_auth = request.headers.get('Authorization')
        if not header_auth:
            return jsonify({"error": "missing authorization header"}), 401

        # verify id token
        id_token = header_auth.replace('Bearer ', '')
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            logging.info(uid)
        except Exception as e:
            return jsonify({"error": "invalid or expired token", "details": str(e)}), 401

        # get query params
        user_uid = request.args.get('userUid')
        graph_types = request.args.getlist('graphTypes')

        if not user_uid:
            return jsonify({"error": "missing userUid parameter"}), 400

        if user_uid != uid:
            return jsonify({"error": "unauthorized access"}), 403

        if not graph_types:
            return jsonify({"error": "missing graphTypes parameter"}), 400

        # retrieve user drink data
        user_drink_ref = db.collection('users').document(user_uid).collection('userDrinkData')
        user_drink_data = [doc.to_dict() for doc in user_drink_ref.stream(transaction=None)]

        if not user_drink_data:
            return jsonify({"message": "no drink data found for the user"}), 404

        logging.info(user_drink_data)

        # calculate statistics
        response = {}
        for graph_type in graph_types:
            if graph_type in STATISTIC_FUNCTIONS:
                response[graph_type] = STATISTIC_FUNCTIONS[graph_type](user_drink_data)
            else:
                response[graph_type] = {"error": f"unsupported graph type: {graph_type}"}

        return jsonify(response)

    except Exception as e:
        logging.error(f"error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

def get_all_drinks():
    stores_ref = db.collection('stores')
    all_drinks = []
    for store in stores_ref.stream():
        store_drinks_ref = store.reference.collection('storeDrinkData')
        store_drinks = [drink.to_dict() for drink in store_drinks_ref.stream()]
        all_drinks.extend(store_drinks)
    return all_drinks
    
# process receipt
#  involves post processing -> ner model -> fuzzy synt match w/ menu drinks -> return drinkUid if match, else null/none
@app.route('/api/process-receipt', methods=['POST'])
def process_receipt():

    # extract auth header
    header_auth = request.headers.get('Authorization')
    if not header_auth:
        return jsonify({"error": "missing authorization header"}), 401

    # remove bearer keyword
    id_token = header_auth.replace('Bearer ', '')

    # verify user token
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        logging.info(f"authorized uid: {uid}")
    except Exception as e:
        return jsonify({"error": "invalid or expired token", "details": str(e)}), 401

    # get query params
    user_uid = request.args.get('userUid')

    # validate params
    if not user_uid:
        return jsonify({"error": "missing userUid parameter"}), 400

    # ensure user is authorized
    if user_uid != uid:
        return jsonify({"error": "unauthorized access"}), 403

    # BELOW IS IMAGE PROCESSING
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    image_file = request.files['image']  # Access the uploaded file

    logging.info("Image file loaded")
    logging.info(request.files)
    # try:
    # Open the image using PIL (can handle PNG, JPEG, etc.)
    pil_image = Image.open(image_file).convert('RGB')

    logging.info("Opened image")

    # Convert the PIL image to a NumPy array for OpenCV processing
    image_array = np.array(pil_image)
    logging.info(image_array)
    image_bgr = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)  # Convert to BGR for OpenCV


    logging.info("Converted image")
    # Preprocess the image
    otsu_result, adaptive_result = preprocess_image(image_bgr)

    
    logging.info("Processed image")

    # Extract text using Tesseract
    extracted_text = pytesseract.image_to_string(adaptive_result, config=r'--oem 3 --psm 11')
    
    
    logging.info("Extracted text")
    # Run NLP to extract drink names
    entities = extract_drink_name_from_text(extracted_text, nlp)

    if(len(entities) <= 0):
         return jsonify({
            "status": "success",
            "message": "No receipt results.",
            "entities": []
        }), 200

    # MATCH SYNTACTICALLY (not semantically)
    all_drinks = get_all_drinks()
    logging.info(f"Retrieved {len(all_drinks)} drinks from all stores")
    logging.info(all_drinks)
    logging.info(entities)
    # since our database is small (<100), let's just check all and return drink id match on two conditions:
    # 1. past a certain treshold
    # 2. top n results
    match_threshold = 60
    max_results = 3

    matched_drinks = []

    for entity_data in entities:
        for drink_data in all_drinks:
            if(fuzz.partial_ratio(drink_data.get("name"), entity_data.get("entity")) > match_threshold):
                matched_drinks.append(drink_data)
                if(len(matched_drinks) >= max_results):
                    break

    # Return success response with optional data
    return jsonify({
        "status": "success",
        "message": "Receipt processed successfully.",
        "matchedDrinks": matched_drinks
    }), 200


# delete endpoint
@app.route('/api/delete-drink', methods=['DELETE'])
def delete_drink():
   
    # extract auth header
    header_auth = request.headers.get('Authorization')
    if not header_auth:
        return jsonify({"error": "missing authorization header"}), 401

    # remove bearer keyword
    id_token = header_auth.replace('Bearer ', '')

    # verify user token
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        logging.info(f"authorized uid: {uid}")
    except Exception as e:
        return jsonify({"error": "invalid or expired token", "details": str(e)}), 401

    # get query params
    user_uid = request.args.get('userUid')
    drink_uid = request.args.get('drinkUid')

    logging.info("\n")
    logging.info(user_uid)
    logging.info(drink_uid)

    # validate params
    if not user_uid:
        return jsonify({"error": "missing userUid parameter"}), 400
    if not drink_uid:
        return jsonify({"error": "missing drinkUid parameter"}), 400

    # ensure user is authorized
    if user_uid != uid:
        return jsonify({"error": "unauthorized access"}), 403

    # document path for drink
    doc_path = f"users/{user_uid}/userDrinkData/{drink_uid}"

    # attempt to delete document and subcollections
    try:
        delete_document_and_subcollections(doc_path)
        return jsonify({"status": "success", "message": f"drink '{drink_uid}' deleted successfully."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def delete_document_and_subcollections(doc_path):
    # delete document and subcollections recursively
    doc_ref = db.document(doc_path)
    delete_subcollections(doc_ref)
    doc_ref.delete()

def delete_subcollections(doc_ref):
    # recursively delete all subcollections
    subcollections = doc_ref.collections()
    for subcollection in subcollections:
        delete_collection(subcollection)

def delete_collection(collection_ref, batch_size=10):
    # delete collection in batches
    while True:
        docs = list(collection_ref.limit(batch_size).stream())
        if not docs:
            break
        for doc in docs:
            delete_subcollections(doc.reference)
            doc.reference.delete()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
