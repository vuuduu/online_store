const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
// app.use(express.static('./public'));
app.use(express.json()) // middle ware to handle post req

const mongoURL = "mongodb://localhost:27017/";
const mongoDB = "OnlineStore";
const userCollections = "users";
const carsCollections = "cars";

// home
app.get('/', async (req, res) => {
    res.send('Node Server is Running')
})

// get all cars
app.get('/api/gallery', async (_req, res) => {
    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get cars data
        const cars = db.collection(carsCollections);
        const carData = await cars.find({}).toArray();

        res.json(carData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting all cars");
    }
})

// get reccomended cars
app.get('/api/suggested/:userid', async (req, res) => {
    const { userid } = req.params

    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get user data
        const users = db.collection(userCollections);
        const userData = await users.findOne({ "user_id": Number(userid) });
        const userCarHistory = userData.history.cars;

        const flaskUrl = 'http://localhost:5000/predict'

        const response = await axios.post(flaskUrl, {
            arrayData: userCarHistory
        });

        const responseData = response.data;

        res.json(responseData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting all cars");
    }
})

// post user login
app.post('/api/login', async (req, res) => {
    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get users data from db & request body
        const users = db.collection(userCollections);
        const { username, password } = req.body;

        console.log("TEST: ", username, password);

        // find user in db
        const user = await users.findOne({ username: username })

        // check if user exist & the password match
        if (user && user.password === password) {
            // User found and password matches
            res.status(200).json({
                success: true,
                message: "Logged In Successful!",
                user
            });
        } else {
            // Send status 401 = unauthorized access
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "Error with login" });
    }
})

// post user register
app.post('/api/register', async (req, res) => {
    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get users data from db & request body
        const users = db.collection(userCollections);
        const { username, password, name } = req.body;

        // check if user exist and send appropriate response (400 = Bad Request)
        const existingUser = await users.findOne({ username: username })
        if (existingUser) {
            client.close();
            return res.status(400).json({
                success: false,
                message: "Username already exist"
            });
        }

        // add user in database if not already exist
        const newUser = {
            user_id: await users.countDocuments() + 1,
            username,
            password,
            name,
            history: {
                cars: [], shipping: [], payment: []
            }
        }

        // Insert new user & check if it worked
        const result = await users.insertOne(newUser);

        if (result.acknowledged) {
            res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
        } else {
            res.status(500).json({ success: false, message: "Failed to register user" });
        }

        client.close();

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error With Register");
    }
})

// get user purchase history
app.get('/api/history/:userid', async (req, res) => {
    const { userid } = req.params

    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get user data
        const users = db.collection(userCollections);
        const userData = await users.findOne({ "user_id": Number(userid) });

        const cars = db.collection(carsCollections);

        const carHistoryList = await cars.find({ id: { $in: userData.history.cars } }).toArray();

        res.json(carHistoryList)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting user history");
    }
})

// update user purchase history
app.post('/api/checkout/', async (req, res) => {
    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get user data
        const users = db.collection(userCollections);

        const { userId, address, payment, cars } = req.body;

        const operations = cars.map(car => ({
            updateOne: {
                filter: { user_id: Number(userId) },
                update: {
                    $push: {
                        'history.cars': car,
                        'history.payment': payment,
                        'history.shipping': address
                    }
                }
            }
        }));

        const result = await users.bulkWrite(operations);

        if (result.modifiedCount == cars.length) {
            res.status(201).json({ success: true, message: "User history updated successfully" });
        } else {
            res.status(500).json({ success: false, message: "Failed to update user history" });
        }

        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting user history");
    }
})

// listening
app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})