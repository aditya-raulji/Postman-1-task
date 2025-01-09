// this is full for Message collection

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
let db, Messages;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        Messages = db.collection("Messages");

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

// GET: List all Messages
app.get('/Messages', async (req, res) => {
    try {
        const allmessages = await Messages.find().toArray();
        res.status(200).json(allmessages);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});

// POST: Add a new user
app.post('/Messages', async (req, res) => {
    try {

        
        // console.log("Request Object :" , req)
        // console.log("Request Body :" , req.body)

        const newmessage = req.body;
        const result = await users.insertOne(newmessage);
        res.status(201).send(`User added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding user: " + err.message);
    }
});

// PUT: Update a user completely
app.put('/users/:messageId', async (req, res) => {
    try {

        
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)

        const messageId = (req.params.messageId);
        const updatedmessage = req.body;
        const result = await Messages.replaceOne({ messageId }, updatedmessage);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});

// PATCH: Partially update a user
app.patch('/Messages/:messageId', async (req, res) => {
    try {

         
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)


        const messageId = (req.params.messageId);
        const updates = req.body;
        const result = await Messages.updateOne({ messageId }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating user: " + err.message);
    }
});

// DELETE: Remove a Messages
app.delete('/Messages/:messageId', async (req, res) => {
    try {


        // console.log("Request Params :" , req.params)
           // console.log("Request Body :" , req.body)


        const messageId = req.params.messageId;
        const result = await Messages.deleteOne({ messageId });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
});
