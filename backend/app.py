from flask import Flask
from flask_cors import CORS

# Import Blueprints
from backend.routes.search_routes import search_bp
from backend.routes.service_routes import service_bp
from backend.routes.auth_routes import auth_bp

app = Flask(__name__)

# 🔐 Required for sessions
app.secret_key = "supersecretkey"

# ✅ Enable CORS for React
CORS(app, supports_credentials=True)


# ---------------- REGISTER ROUTES ----------------
app.register_blueprint(search_bp, url_prefix="/api")
app.register_blueprint(service_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)