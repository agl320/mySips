from firebase_admin import firestore
from app.config import firebase_app

db = firestore.client(firebase_app)

def get_firestore_client():
    return db
