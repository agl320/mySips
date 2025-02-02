from flask import jsonify
from firebase_admin import auth
import logging
import numpy as np
from PIL import Image
import cv2
import pytesseract
from fuzzywuzzy import fuzz
import spacy
from app.services.firestore_service import get_firestore_client
from app.services.drink_service import get_all_drinks
from app.services.receipt_processing import ReceiptProcessor  

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

db = get_firestore_client()
nlp = spacy.load("./data/output/model-best") 
receipt_processor = ReceiptProcessor(nlp)

def process_receipt(request):
    """
    Process uploaded receipt image.
    """
    try:
        header_auth = request.headers.get('Authorization')
        if not header_auth:
            return jsonify({"error": "missing auth header"}), 401

        id_token = header_auth.replace('Bearer ', '')
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']

        user_uid = request.args.get('userUid')
        if not user_uid or user_uid != uid:
            return jsonify({"error": "unauthorized"}), 403

        if 'image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image_file = request.files['image']
        pil_image = Image.open(image_file).convert('RGB')
        image_array = np.array(pil_image)
        image_bgr = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)

        otsu_result, adaptive_result = receipt_processor.preprocess_image(image_bgr)
        extracted_text = pytesseract.image_to_string(adaptive_result, config=r'--oem 3 --psm 11')

        entities = receipt_processor.extract_drink_name_from_text(extracted_text)
        if not entities:
            return jsonify({"status": "success", "message": "No receipt results.", "entities": []}), 200

        all_drinks = get_all_drinks()
        match_threshold = 60
        max_results = 3
        matched_drinks = []

        for entity in entities:
            for drink in all_drinks:
                if fuzz.partial_ratio(drink.get("name"), entity.get("entity")) > match_threshold:
                    matched_drinks.append(drink)
                    if len(matched_drinks) >= max_results:
                        break

        return jsonify({"status": "success", "message": "Receipt processed.", "matchedDrinks": matched_drinks}), 200

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
