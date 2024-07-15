from flask import Flask, request, jsonify
import pickle
import pandas as pd
from pymongo import MongoClient
import random

app = Flask(__name__)

# Setup connection to MongoDB
mongo_uri = 'mongodb://localhost:27017/OnlineStore'
client = MongoClient(mongo_uri)
db = client.get_database()

# Load the model and preprocessing components
with open('./knn_model/knn_model.pkl', 'rb') as f:
    knn_model = pickle.load(f)
with open('./knn_model/le_make.pkl', 'rb') as f:
    le_make = pickle.load(f)
with open('./knn_model/le_user_profile.pkl', 'rb') as f:
    le_user_profile = pickle.load(f)
with open('./knn_model/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

carList = dict({'enthusiast' : [], 'robust' : [], 'utility' : []})
carUserProfile = dict()

from collections import Counter

def generate_list_with_ratio(original_list, size=10):
    # Step 1: Count frequencies of each category in original_list
    count = Counter(original_list)
    
    # Step 2: Calculate target counts for each category in new list
    new_list = []
    total_items = 0
    
    for category, frequency in count.items():
        target_count = int(size * (frequency / len(original_list)))
        new_list.extend([category] * target_count)
        total_items += target_count
    
    # Step 3: Adjust for the exact size of the new list
    if total_items < size:
        remaining = size - total_items
        categories = list(count.keys())
        while remaining > 0:
            for category in categories:
                if remaining > 0:
                    new_list.append(category)
                    remaining -= 1
    
    return new_list[:size]  # Trim to size 10 if needed

# Gives a predicted user profile for a given car
def predict_car_user_profile(data):
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
    return prediction

# Creates predictions for the entire car database
def predict_user_profiles():
    global carList
    global carUserProfile
    carsCollection = db.cars
    cars = carsCollection.find()

    for car in cars:
        userProfilePrediction = str(predict_car_user_profile(car)).lower()
        car['user_profile'] = userProfilePrediction
        carList[userProfilePrediction].append(car)
        carUserProfile[car['id']] = userProfilePrediction

predict_user_profiles()

@app.route('/')
def home():
    return "Car Rental Prediction API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data and user's car history from POST request
        request_data = request.get_json()
        rental_history = request_data.get('arrayData')

        # Track how many of each type of vehicle the user has rented
        userHistory = []
        for car in rental_history:
            userHistory.append(carUserProfile[car])

        # Makes a list of car categories to reccomend (10 total)
        # Preserves the ratio of the rental history so that user gets weighted recs
        carsProfilesToRecommend = generate_list_with_ratio(userHistory, size=10)
        recommendedCars = []
        for category in carsProfilesToRecommend:
            while (True):
                selectedCar = random.choice(carList[category])
                if (selectedCar['id'] not in rental_history):
                    del selectedCar['_id']
                    recommendedCars.append(selectedCar)
                    break

        return jsonify(recommendedCars)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)