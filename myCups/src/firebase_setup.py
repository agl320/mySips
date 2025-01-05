import os
from firebase_admin import auth, credentials, firestore
import firebase_admin
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

import logging

logging.basicConfig(level=logging.INFO)

load_dotenv()

if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
    raise ValueError("Env var GOOGLE_APPLICATION_CREDENTIALS is unknown")

cred = credentials.Certificate(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Placeholder Functions for Statistics
def calculate_sugar_vs_ice(user_drink_data):
    try:
        return [
            {"x": drink["sugarLevel"], "y": drink["iceLevel"]}
            for drink in user_drink_data
            if not drink.get("placeholder", False)
        ]
    except KeyError as e:
        logging.error(f"Missing key in data: {e}")
        return []

def calculate_rating_count(user_drink_data):
    # Initialize a dictionary to store counts for each rating level
    rating_counts = {rating: 0 for rating in range(11)}  # 0 to 10

    for drink in user_drink_data:
        rating = drink.get("rating")
        if rating is not None and 0 <= rating <= 10:  # Ensure valid rating
            rating_counts[rating] += 1

    return rating_counts

def calculate_drinks_per_week(user_drink_data):
    # Placeholder logic for drinks per week
    return {"week1": 10, "week2": 15}

def calculate_money_per_week(user_drink_data):
    # Placeholder logic for money spent per week
    return {"week1": 50, "week2": 75}

def calculate_average_drink_price(user_drink_data):
    # Placeholder logic for average drink price
    prices = [drink.get("price", 0) for drink in user_drink_data]
    return sum(prices) / len(prices) if prices else 0

# Mapping Statistic Types to Functions
STATISTIC_FUNCTIONS = {
    "sugar_vs_ice": calculate_sugar_vs_ice,
    "rating_count": calculate_rating_count,
    "drink_per_week": calculate_drinks_per_week,
    "money_per_week": calculate_money_per_week,
    "average_drink_price": calculate_average_drink_price,
}

@app.route('/api/user-drink-data/stats', methods=['GET'])
def get_user_drinks():
    try:
        logging.info("\n\nDEBUG:")

        # Extracting header and query parameters
        header_auth = request.headers.get('Authorization')
        if not header_auth:
            return jsonify({"error": "Missing Authorization header"}), 401

        id_token = header_auth.replace('Bearer ', '')

        # Verify the token
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
        except Exception as e:
            return jsonify({"error": "Invalid or expired token", "details": str(e)}), 401

        user_uid = request.args.get('userUid')
        graph_types = request.args.getlist('graphTypes')  # Extract graph types as a list

        # Check if the user id is provided and matches
        if not user_uid:
            return jsonify({"error": "Missing userUid parameter"}), 400

        if user_uid != uid:
            return jsonify({"error": "Unauthorized access"}), 403

        if not graph_types:
            return jsonify({"error": "Missing graphTypes parameter"}), 400

        # At this point, user has been verified
        # Retrieve and format data
        user_drink_ref = db.collection('users').document(user_uid).collection('userDrinkData')
        user_drink_data = [doc.to_dict() for doc in user_drink_ref.stream(transaction=None)]


        if not user_drink_data:
            return jsonify({"message": "No drink data found for the user"}), 404

        logging.info(len(user_drink_data))

        # Dynamically calculate requested statistics
        response = {}
        for graph_type in graph_types:
            if graph_type in STATISTIC_FUNCTIONS:
                response[graph_type] = STATISTIC_FUNCTIONS[graph_type](user_drink_data)
            else:
                response[graph_type] = {"error": f"Unsupported graph type: {graph_type}"}

        return jsonify(response)

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
