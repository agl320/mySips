import os
from firebase_admin import auth, credentials, firestore
import firebase_admin
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), './priv/.env')
load_dotenv(dotenv_path)

if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
    raise ValueError("Env var GOOGLE_APPLICATION_CREDENTIALS is unknown")

# Initialize Firebase
cred = credentials.Certificate(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# Export the Firestore client
def get_firestore_client():
    return db
