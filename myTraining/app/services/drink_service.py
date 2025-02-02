from flask import jsonify
from firebase_admin import auth
import logging
from app.services.firestore_service import get_firestore_client

db = get_firestore_client()

def get_all_drinks():
    stores_ref = db.collection('stores')
    all_drinks = []
    for store in stores_ref.stream():
        store_drinks_ref = store.reference.collection('storeDrinkData')
        store_drinks = [drink.to_dict() for drink in store_drinks_ref.stream()]
        all_drinks.extend(store_drinks)
    return all_drinks

def delete_drink(request):
    try:
        header_auth = request.headers.get('Authorization')
        if not header_auth:
            return jsonify({"error": "missing authorization header"}), 401

        id_token = header_auth.replace('Bearer ', '')
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            logging.info(f"Authorized UID: {uid}")
        except Exception as e:
            return jsonify({"error": "invalid or expired token", "details": str(e)}), 401

        user_uid = request.args.get('userUid')
        drink_uid = request.args.get('drinkUid')

        logging.info(f"User UID: {user_uid}")
        logging.info(f"Drink UID: {drink_uid}")

        if not user_uid:
            return jsonify({"error": "missing userUid parameter"}), 400
        if not drink_uid:
            return jsonify({"error": "missing drinkUid parameter"}), 400
        if user_uid != uid:
            return jsonify({"error": "unauthorized access"}), 403

        doc_path = f"users/{user_uid}/userDrinkData/{drink_uid}"

        try:
            delete_document_and_subcollections(doc_path)
            return jsonify({"status": "success", "message": f"Drink '{drink_uid}' deleted successfully."}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def delete_document_and_subcollections(doc_path):
    doc_ref = db.document(doc_path)
    delete_subcollections(doc_ref)
    doc_ref.delete()

def delete_subcollections(doc_ref):
    subcollections = doc_ref.collections()
    for subcollection in subcollections:
        delete_collection(subcollection)

def delete_collection(collection_ref, batch_size=10):
    while True:
        docs = list(collection_ref.limit(batch_size).stream())
        if not docs:
            break
        for doc in docs:
            delete_subcollections(doc.reference)
            doc.reference.delete()
