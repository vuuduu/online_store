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
    res.send('RECC')
})

// get user data
app.post('/api/login', async (req, res) => {
    try {
        const { username } = req.body;
        console.log(username);
        res.status(201).json(username);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting all cars");
    }
})

// get user purchase history
app.get('/api/carHistory/:userid', (req, res) => {
    res.send('History')
})

// update user purchase history
app.post('/api/checkout/:userid', (req, res) => {
    res.send('HISTING POST CHECKOUT')
})

// listening
app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})