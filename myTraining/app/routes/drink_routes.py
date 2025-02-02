from flask import Blueprint, jsonify, request
import logging
from firebase_admin import auth
from app.services.receipt_service import process_receipt
from app.services.drink_service import delete_drink

drink_bp = Blueprint('drink_routes', __name__, url_prefix='/api')

@drink_bp.route('/process-receipt', methods=['POST'])
def process_receipt_route():
    return process_receipt(request)

@drink_bp.route('/delete-drink', methods=['DELETE'])
def delete_drink_route():
    return delete_drink(request)
