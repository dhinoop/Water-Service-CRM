from flask import Blueprint, request, jsonify, session

auth_bp = Blueprint("auth", __name__)

USERS = {
    "admin": "admin123",
    "staff": "staff123"
}

# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username in USERS and USERS[username] == password:
        session["user"] = username   # ✅ single source of truth
        return jsonify({"status": "success"})

    return jsonify({"status": "error"}), 401


# ---------------- LOGOUT ----------------
@auth_bp.route("/logout", methods=["GET"])
def logout():
    session.clear()
    return jsonify({"status": "logged_out"})


# ---------------- CHECK AUTH ----------------
@auth_bp.route("/check-auth", methods=["GET"])
def check_auth():
    if "user" in session:
        return jsonify({"authenticated": True})
    return jsonify({"authenticated": False})     