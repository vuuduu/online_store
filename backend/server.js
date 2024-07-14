const { MongoClient, ObjectId } = require('mongodb');

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
    res.send('Hello World!')
})

// get all cars
app.get('/api/allCars', async (_req, res) => {
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
app.get('/api/recommended/:userid', (req, res) => {
    // request the flask backend
    // retrieval data = list of reccomend car for given users from flask
    res.send('RECC')
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
                user_id: user.user_id,
                name: user.name
            });
        } else {
            // User not found or password doesn't match
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

        // check if user exist and send appropriate response
        const existingUser = await users.findOne({ username: username })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exist"
            })
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
            res.status(201).json({ success: true, message: "User registered successfully" });
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
app.get('/api/carHistory/:userid', async (req, res) => {
    const { userid } = req.params

    try {
        // connecting to MONGO DB
        const client = await MongoClient.connect(mongoURL);
        const db = client.db(mongoDB);

        // get cars data
        const users = db.collection(userCollections);
        const userData = await users.findOne({ "user_id": userid });

        res.json(userData)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting user history");
    }
})

// update user purchase history
app.post('/api/checkout/:userid', (req, res) => {
    res.send('HISTING POST CHECKOUT')
})

// listening
app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})