from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

app = Flask(__name__)
CORS(app)

# MongoDB connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/Dengue_app"
mongo = PyMongo(app)

# Define fuzzy variables
temperature = ctrl.Antecedent(np.arange(95, 106, 1), "temperature")
wbc_count = ctrl.Antecedent(np.arange(1, 16, 1), "wbc_count")
platelet_count = ctrl.Antecedent(np.arange(10, 401, 10), "platelet_count")
dengue_risk = ctrl.Consequent(np.arange(0, 101, 1), "dengue_risk")

# Membership functions
temperature["low"] = fuzz.trimf(temperature.universe, [95, 95, 98])
temperature["normal"] = fuzz.trimf(temperature.universe, [97, 98, 100])
temperature["high"] = fuzz.trimf(temperature.universe, [99, 104, 106])

wbc_count["low"] = fuzz.trimf(wbc_count.universe, [1, 1, 4])
wbc_count["normal"] = fuzz.trimf(wbc_count.universe, [3, 7, 11])
wbc_count["high"] = fuzz.trimf(wbc_count.universe, [10, 15, 15])

platelet_count["low"] = fuzz.trimf(platelet_count.universe, [10, 10, 150])
platelet_count["normal"] = fuzz.trimf(platelet_count.universe, [100, 200, 300])
platelet_count["high"] = fuzz.trimf(platelet_count.universe, [250, 400, 400])

dengue_risk["low"] = fuzz.trimf(dengue_risk.universe, [0, 0, 50])
dengue_risk["medium"] = fuzz.trimf(dengue_risk.universe, [25, 50, 75])
dengue_risk["high"] = fuzz.trimf(dengue_risk.universe, [50, 100, 100])

# Define rules
rules = []
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["low"] & platelet_count["low"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["low"] & platelet_count["normal"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["low"] & platelet_count["high"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["normal"] & platelet_count["low"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["normal"] & platelet_count["normal"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["normal"] & platelet_count["high"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["high"] & platelet_count["low"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["high"] & platelet_count["normal"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["low"] & wbc_count["high"] & platelet_count["high"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["low"] & platelet_count["low"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["low"] & platelet_count["normal"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["low"] & platelet_count["high"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["normal"] & platelet_count["low"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["normal"] & platelet_count["normal"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["normal"] & platelet_count["high"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["high"] & platelet_count["low"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["high"] & platelet_count["normal"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["normal"] & wbc_count["high"] & platelet_count["high"],
        dengue_risk["low"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["low"] & platelet_count["low"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["low"] & platelet_count["normal"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["low"] & platelet_count["high"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["normal"] & platelet_count["low"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["normal"] & platelet_count["normal"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["normal"] & platelet_count["high"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["high"] & platelet_count["low"],
        dengue_risk["high"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["high"] & platelet_count["normal"],
        dengue_risk["medium"],
    )
)
rules.append(
    ctrl.Rule(
        temperature["high"] & wbc_count["high"] & platelet_count["high"],
        dengue_risk["low"],
    )
)

# Create control system
dengue_ctrl = ctrl.ControlSystem(rules)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        dengue_sim = ctrl.ControlSystemSimulation(dengue_ctrl)
        dengue_sim.input["temperature"] = float(data["temperature"])
        dengue_sim.input["wbc_count"] = float(data["wbc"])
        dengue_sim.input["platelet_count"] = float(data["platelet"])

        dengue_sim.compute()
        result = dengue_sim.output["dengue_risk"]
        return jsonify({"dengue_risk": round(result, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    users = mongo.db.users

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already registered"}), 409

    hashed_password = generate_password_hash(data["password"])
    users.insert_one(
        {
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "email": data["email"],
            "phone": data["phone"],
            "password": hashed_password,
        }
    )

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    users = mongo.db.users

    user = users.find_one({"email": data["email"]})
    if user and check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True)



# --------------------------------------------------------------------------------------
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash
# import numpy as np
# import skfuzzy as fuzz
# from skfuzzy import control as ctrl
# import random
# import smtplib
# from email.mime.text import MIMEText
# from datetime import datetime, timedelta

# app = Flask(__name__)
# CORS(app)

# # MongoDB connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/Dengue_app"
# mongo = PyMongo(app)

# # Fuzzy logic setup
# temperature = ctrl.Antecedent(np.arange(95, 106, 1), "temperature")
# wbc_count = ctrl.Antecedent(np.arange(1, 16, 1), "wbc_count")
# platelet_count = ctrl.Antecedent(np.arange(10, 401, 10), "platelet_count")
# dengue_risk = ctrl.Consequent(np.arange(0, 101, 1), "dengue_risk")

# temperature["low"] = fuzz.trimf(temperature.universe, [95, 95, 98])
# temperature["normal"] = fuzz.trimf(temperature.universe, [97, 98, 100])
# temperature["high"] = fuzz.trimf(temperature.universe, [99, 104, 106])

# wbc_count["low"] = fuzz.trimf(wbc_count.universe, [1, 1, 4])
# wbc_count["normal"] = fuzz.trimf(wbc_count.universe, [3, 7, 11])
# wbc_count["high"] = fuzz.trimf(wbc_count.universe, [10, 15, 15])

# platelet_count["low"] = fuzz.trimf(platelet_count.universe, [10, 10, 150])
# platelet_count["normal"] = fuzz.trimf(platelet_count.universe, [100, 200, 300])
# platelet_count["high"] = fuzz.trimf(platelet_count.universe, [250, 400, 400])

# dengue_risk["low"] = fuzz.trimf(dengue_risk.universe, [0, 0, 50])
# dengue_risk["medium"] = fuzz.trimf(dengue_risk.universe, [25, 50, 75])
# dengue_risk["high"] = fuzz.trimf(dengue_risk.universe, [50, 100, 100])

# # Fuzzy rules
# rules = []
# # [All your existing fuzzy rules - unchanged for brevity]
# # (Keep all the existing fuzzy rules here as they are in your original file)

# dengue_ctrl = ctrl.ControlSystem(rules)


# # Routes
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json
#     try:
#         dengue_sim = ctrl.ControlSystemSimulation(dengue_ctrl)
#         dengue_sim.input["temperature"] = float(data["temperature"])
#         dengue_sim.input["wbc_count"] = float(data["wbc"])
#         dengue_sim.input["platelet_count"] = float(data["platelet"])

#         dengue_sim.compute()
#         result = dengue_sim.output["dengue_risk"]
#         return jsonify({"dengue_risk": round(result, 2)})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     users = mongo.db.users

#     if users.find_one({"email": data["email"]}):
#         return jsonify({"message": "Email already registered"}), 409

#     hashed_password = generate_password_hash(data["password"])
#     users.insert_one(
#         {
#             "first_name": data["first_name"],
#             "last_name": data["last_name"],
#             "email": data["email"],
#             "phone": data["phone"],
#             "password": hashed_password,
#         }
#     )

#     return jsonify({"message": "User registered successfully"}), 201


# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     users = mongo.db.users

#     user = users.find_one({"email": data["email"]})
#     if user and check_password_hash(user["password"], data["password"]):
#         return jsonify({"message": "Login successful"}), 200
#     else:
#         return jsonify({"message": "Invalid credentials"}), 401


# # OTP store
# otp_store = {}


# @app.route("/forgot-password", methods=["POST"])
# def forgot_password():
#     data = request.json
#     email = data.get("email")

#     user = mongo.db.users.find_one({"email": email})
#     if not user:
#         return jsonify({"message": "Email not found"}), 404

#     otp = str(random.randint(100000, 999999))
#     otp_store[email] = {"otp": otp, "expires": datetime.utcnow() + timedelta(minutes=5)}

#     try:
#         sender_email = "your_email@gmail.com"
#         sender_password = "your_email_password"
#         msg = MIMEText(f"Your OTP is: {otp}")
#         msg["Subject"] = "Your OTP for Password Reset"
#         msg["From"] = sender_email
#         msg["To"] = email

#         with smtplib.SMTP("smtp.gmail.com", 587) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.sendmail(sender_email, [email], msg.as_string())

#         return jsonify({"message": "OTP sent to email"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/verify-otp", methods=["POST"])
# def verify_otp():
#     data = request.json
#     email = data.get("email")
#     otp = data.get("otp")

#     entry = otp_store.get(email)
#     if not entry:
#         return jsonify({"message": "No OTP request found"}), 404

#     if entry["otp"] == otp and datetime.utcnow() < entry["expires"]:
#         return jsonify({"message": "OTP verified"}), 200
#     else:
#         return jsonify({"message": "Invalid or expired OTP"}), 400


# @app.route("/reset-password", methods=["POST"])
# def reset_password():
#     data = request.json
#     email = data.get("email")
#     new_password = data.get("new_password")

#     if email in otp_store:
#         hashed_password = generate_password_hash(new_password)
#         mongo.db.users.update_one(
#             {"email": email}, {"$set": {"password": hashed_password}}
#         )
#         otp_store.pop(email, None)
#         return jsonify({"message": "Password reset successful"}), 200
#     else:
#         return jsonify({"message": "OTP verification required"}), 400


# if __name__ == "__main__":
#     app.run(debug=True)
