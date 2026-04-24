from flask import Blueprint, request, jsonify
from backend.services.scheduler import generate_services_for_selected_date
from datetime import datetime

service_bp = Blueprint("service", __name__)

@service_bp.route("/services", methods=["POST"])
def services():
    data = request.json
    selected_date = datetime.strptime(data.get("date"), "%Y-%m-%d").date()

    result = generate_services_for_selected_date(selected_date)

    if isinstance(result, str):
        return jsonify({"message": result})

    return result.to_json(orient="records")