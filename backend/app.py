from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Enable CORS
CORS(app)

# Load dataset
file_path = r"C:\steel-troubleshooting-system\dataset\final_cleaned_data.csv"

df = pd.read_csv(file_path)

# Home route
@app.route("/")
def home():
    return "Steel Plant Troubleshooting API Running"

# Get all machine names
@app.route("/machines")
def get_machines():

    machines = df["Machine"].dropna().unique().tolist()

    return jsonify(machines)

# Get troubleshooting data
@app.route("/machine/<machine_name>")
def get_machine_data(machine_name):

    machine_data = df[df["Machine"].str.lower() == machine_name.lower()]

    result = machine_data.to_dict(orient="records")

    return jsonify(result)

# Run server
if __name__ == "__main__":
    app.run(debug=True)