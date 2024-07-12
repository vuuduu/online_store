from flask import Flask, request, jsonify

PORT = 5000

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello World"

if __name__ == '__main__':
    print(f"Starting Flask app on port http://localhost:{PORT}")
    app.run(debug=True, port=PORT)

