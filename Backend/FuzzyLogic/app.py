
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

app = Flask(__name__)
CORS(app)

# Define fuzzy variables
temperature = ctrl.Antecedent(np.arange(99.1, 105.8, 0.1), 'temperature')           #°F
wbc_count = ctrl.Antecedent(np.arange(1, 15, 0.1), 'wbc_count')                 #1000/µL
platelet_count = ctrl.Antecedent(np.arange(10, 450, 1), 'platelet_count')   # 1000/µL
dengue_risk = ctrl.Consequent(np.arange(0, 100, 1), 'dengue_risk')             # %

# Membership functions
temperature['low'] = fuzz.trimf(temperature.universe, [99.1, 99.1, 100.8])
temperature['normal'] = fuzz.trimf(temperature.universe, [100.4, 101.55, 102.7])
temperature['high'] = fuzz.trimf(temperature.universe, [102.4, 105.8, 105.8])
wbc_count['low'] = fuzz.trimf(wbc_count.universe, [1, 1, 6])
wbc_count['normal'] = fuzz.trimf(wbc_count.universe, [4, 9, 14])
wbc_count['high'] = fuzz.trimf(wbc_count.universe, [11, 15, 15])
platelet_count['low'] = fuzz.trimf(platelet_count.universe, [10, 10, 160])
platelet_count['normal'] = fuzz.trimf(platelet_count.universe, [150, 300, 450])
platelet_count['high'] = fuzz.trimf(platelet_count.universe, [450, 600, 600])
dengue_risk['low'] = fuzz.trimf(dengue_risk.universe, [0, 0, 40])
dengue_risk['medium'] = fuzz.trimf(dengue_risk.universe, [40, 55, 70])
dengue_risk['high'] = fuzz.trimf(dengue_risk.universe, [70, 100, 100])

# Define rules (you can adjust these based on new logic)
rules = [
ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['low'], dengue_risk['medium']),
ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['medium']),
ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['high'], dengue_risk['low']),
ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['medium']),
ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['low']),
ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['low']),
ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['low'], dengue_risk['medium']),
ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['low']),
ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']),
ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['low'], dengue_risk['high']),
ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['high']),
ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['high'], dengue_risk['medium']),
ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['high']),
ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['medium']),
ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['low']),
ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['low'], dengue_risk['medium']),
ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['low']),
ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']),
ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['low'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['high'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['medium']),
ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['low'], dengue_risk['high']),
ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['medium']),
ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']),
]

# Create control system
dengue_ctrl = ctrl.ControlSystem(rules)

@app.route("/predict", methods=['POST'])
def predict():
    data = request.json
    try:
        dengue_sim = ctrl.ControlSystemSimulation(dengue_ctrl)
        dengue_sim.input['temperature'] = float(data['temperature'])
        dengue_sim.input['wbc_count'] = float(data['wbc'])
        dengue_sim.input['platelet_count'] = float(data['platelet'])

        dengue_sim.compute()
        result = dengue_sim.output['dengue_risk']
        return jsonify({"dengue_risk": round(result, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
      app.run(debug=True)