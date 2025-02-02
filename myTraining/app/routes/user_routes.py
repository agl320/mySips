from flask import Blueprint, jsonify, request
from firebase_admin import auth
import logging
from app.services.firestore_service import get_firestore_client
from app.calculations import STATISTIC_FUNCTIONS

user_bp = Blueprint('user_routes', __name__, url_prefix='/api')

db = get_firestore_client()

@user_bp.route('/user-drink-data/stats', methods=['GET'])
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
