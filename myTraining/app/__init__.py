from flask import Flask
from flask_cors import CORS
from firebase_admin import auth
from app.config import firebase_app  # Import initialized Firebase app

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    from app.routes import register_routes
    register_routes(app)

    return app
