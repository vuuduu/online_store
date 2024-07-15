from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model and preprocessing components
with open('./knn_model/knn_model.pkl', 'rb') as f:
    knn_model = pickle.load(f)
with open('./knn_model/le_make.pkl', 'rb') as f:
    le_make = pickle.load(f)
with open('./knn_model/le_user_profile.pkl', 'rb') as f:
    le_user_profile = pickle.load(f)
with open('./knn_model/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/')
def home():
    return "Car Rental Prediction API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.json

        # Check if all required fields are present
        required_fields = ['make', 'horsepower', 'rental_price']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Create a DataFrame from the input data
        input_df = pd.DataFrame([data])

        # Preprocess the input data
        input_df['make'] = le_make.transform(input_df['make'])
        input_df[['horsepower', 'rental_price']] = scaler.transform(input_df[['horsepower', 'rental_price']])

        # Make prediction
        prediction_encoded = knn_model.predict(input_df[['make', 'horsepower', 'rental_price']])

        # Decode prediction
        prediction = le_user_profile.inverse_transform(prediction_encoded)[0]

        # Return the prediction
        return jsonify({'user_profile': prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)