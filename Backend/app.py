from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

app = Flask(__name__)
CORS(app)

# Define fuzzy variables
temperature = ctrl.Antecedent(np.arange(95, 106, 1), 'temperature')
wbc_count = ctrl.Antecedent(np.arange(1, 16, 1), 'wbc_count')
platelet_count = ctrl.Antecedent(np.arange(10, 401, 10), 'platelet_count')
dengue_risk = ctrl.Consequent(np.arange(0, 101, 1), 'dengue_risk')

# Membership functions
temperature['low'] = fuzz.trimf(temperature.universe, [95, 95, 98])
temperature['normal'] = fuzz.trimf(temperature.universe, [97, 98, 100])
temperature['high'] = fuzz.trimf(temperature.universe, [99, 104, 106])

wbc_count['low'] = fuzz.trimf(wbc_count.universe, [1, 1, 4])
wbc_count['normal'] = fuzz.trimf(wbc_count.universe, [3, 7, 11])
wbc_count['high'] = fuzz.trimf(wbc_count.universe, [10, 15, 15])

platelet_count['low'] = fuzz.trimf(platelet_count.universe, [10, 10, 150])
platelet_count['normal'] = fuzz.trimf(platelet_count.universe, [100, 200, 300])
platelet_count['high'] = fuzz.trimf(platelet_count.universe, [250, 400, 400])

dengue_risk['low'] = fuzz.trimf(dengue_risk.universe, [0, 0, 50])
dengue_risk['medium'] = fuzz.trimf(dengue_risk.universe, [25, 50, 75])
dengue_risk['high'] = fuzz.trimf(dengue_risk.universe, [50, 100, 100])

# Define rules
rules = []
rules.append(ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['low'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['low'] & platelet_count['high'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['low'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['low'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['low'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['low'] & platelet_count['high'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['low'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['normal'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['low'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['normal'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['low'] & platelet_count['high'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['low'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['normal'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['normal'] & platelet_count['high'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['low'], dengue_risk['high']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['normal'], dengue_risk['medium']))
rules.append(ctrl.Rule(temperature['high'] & wbc_count['high'] & platelet_count['high'], dengue_risk['low']))

# Create control system
dengue_ctrl = ctrl.ControlSystem(rules)

@app.route('/predict', methods=['POST'])
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
