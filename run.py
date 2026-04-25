import os
from backend.app import app

# ✅ ADD THIS
from backend.database.load_data import *

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )