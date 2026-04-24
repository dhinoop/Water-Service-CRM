from flask import Blueprint, request
from backend.services.ai_engine import (
    search_customer,
    search_by_product,
    search_by_location
)

search_bp = Blueprint("search", __name__)

@search_bp.route("/search", methods=["POST"])
def search():
    data = request.json
    df = search_customer(data.get("name"), data.get("phone"))
    return df.to_json(orient="records")


@search_bp.route("/product", methods=["POST"])
def product():
    data = request.json
    df = search_by_product(data.get("product"))
    return df.to_json(orient="records")


@search_bp.route("/location", methods=["POST"])
def location():
    data = request.json
    df = search_by_location(data.get("location"))
    return df.to_json(orient="records")