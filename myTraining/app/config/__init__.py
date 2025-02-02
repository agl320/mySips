import os
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '../../priv/.env')
load_dotenv(dotenv_path)

def initialize_firebase():
    """
    Initializes the Firebase app using service account credentials.
    """
    cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
    if not cred_path:
        raise ValueError("GOOGLE_APPLICATION_CREDENTIALS environment variable not set")

    cred = credentials.Certificate(cred_path)
    firebase_app = initialize_app(cred)
    return firebase_app

# Initialize Firebase when the config package is imported
firebase_app = initialize_firebase()

# Expose Firebase app so other modules can import it
__all__ = ["firebase_app"]
