// this is full for user collection

const express = require('express');
const { MongoClient } = require('mongodb');

// const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "codingtask";

// Middleware
app.use(express.json());

// app.use(cors());
let db, users;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        users = db.collection("users");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes

// GET: List all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await users.find().toArray();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});

// POST: Add a new user
app.post('/users', async (req, res) => {
    try {

        
        // console.log("Request Object :" , req)
        // console.log("Request Body :" , req.body)

        const newUser = req.body;
        const result = await users.insertOne(newUser);
        res.status(201).send(`User added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding user: " + err.message);
    }
});

// PUT: Update a user completely
app.put('/users/:userId', async (req, res) => {
    try {

        
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)

        const userId = parseInt(req.params.userId);
        const updatedUser = req.body;
        const result = await users.replaceOne({ userId }, updatedUser);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});

// PATCH: Partially update a user
app.patch('/users/:userId', async (req, res) => {
    try {

         
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)


        const userId = parseInt(req.params.userId);
        const updates = req.body;
        const result = await users.updateOne({ userId }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating user: " + err.message);
    }
});

// DELETE: Remove a users
app.delete('/users/:userId', async (req, res) => {
    try {


        // console.log("Request Params :" , req.params)
           // console.log("Request Body :" , req.body)


        const userId = parseInt(req.params.userId);
        const result = await users.deleteOne({ userId });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
});

