from flask import Flask
from flask_cors import CORS

# Import Blueprints
from backend.routes.search_routes import search_bp
from backend.routes.service_routes import service_bp
from backend.routes.auth_routes import auth_bp

app = Flask(__name__)

# 🔐 Secret key
app.secret_key = "supersecretkey"

# ✅ CORS (for React)
CORS(app, supports_credentials=True)

# ✅ Session fix for production (VERY IMPORTANT)
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True
)

# ---------------- REGISTER ROUTES ----------------
app.register_blueprint(search_bp, url_prefix="/api")
app.register_blueprint(service_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")


# ---------------- RUN (LOCAL ONLY) ----------------
if __name__ == "__main__":
    app.run(debug=True)