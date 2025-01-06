from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from firebase_admin import auth

from setup import get_firestore_client
from data_calculations import STATISTIC_FUNCTIONS

logging.basicConfig(level=logging.INFO)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Firestore client
db = get_firestore_client()

@app.route('/api/user-drink-data/stats', methods=['GET'])
def get_user_drinks():
    try:
        logging.info("\n\nDEBUG:")

        # Extract header and query parameters
        header_auth = request.headers.get('Authorization')
        if not header_auth:
            return jsonify({"error": "Missing Authorization header"}), 401

        id_token = header_auth.replace('Bearer ', '')

        # Verify the token
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            logging.info(uid)
        except Exception as e:
            return jsonify({"error": "Invalid or expired token", "details": str(e)}), 401

        user_uid = request.args.get('userUid')
        graph_types = request.args.getlist('graphTypes')

        if not user_uid:
            return jsonify({"error": "Missing userUid parameter"}), 400

        if user_uid != uid:
            return jsonify({"error": "Unauthorized access"}), 403

        if not graph_types:
            return jsonify({"error": "Missing graphTypes parameter"}), 400

        # Retrieve user drink data
        user_drink_ref = db.collection('users').document(user_uid).collection('userDrinkData')
        user_drink_data = [doc.to_dict() for doc in user_drink_ref.stream(transaction=None)]

        if not user_drink_data:
            return jsonify({"message": "No drink data found for the user"}), 404

        logging.info(user_drink_data)

        # Calculate statistics
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
