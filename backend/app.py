from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from backend.src.json_repair import loads

app = Flask(__name__, 
    static_folder='../frontend/static', 
    template_folder='../frontend/templates'
)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/repair-json", methods=["POST"])
def format_json():
    try:
        data = request.get_json()
        malformed_json = data["malformedJSON"]
        parsed_json = loads(malformed_json, logging=True)
        return jsonify(parsed_json)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
