// this is full for connections collection

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
let db, connections;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        connections = db.collection("connections");

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

// GET: List all connections
app.get('/connections', async (req, res) => {
    try {
        const allConnections = await connections.find().toArray();
        res.status(200).json(allConnections);
    } catch (err) {
        res.status(500).send("Error fetching connections: " + err.message);
    }
});

// POST: Add a new connections
app.post('/connections', async (req, res) => {
    try {

        
        // console.log("Request Object :" , req)
        // console.log("Request Body :" , req.body)

        const newconnection = req.body;
        const result = await connections.insertOne(newconnection);
        res.status(201).send(`Connection added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding connections: " + err.message);
    }
});

// PUT: Update a connection completely
app.put('/connections/:connectionId', async (req, res) => {
    try {

        
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)

        const connectionId = (req.params.connectionId);
        const updatedConnection = req.body;
        const result = await connections.replaceOne({ connectionId }, updatedConnection);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating connection: " + err.message);
    }
});

// PATCH: Partially update a connection
app.patch('/connections/:connectionId', async (req, res) => {
    try {

         
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)


        const connectionId = (req.params.connectionId);
        const updates = req.body;
        const result = await connections.updateOne({ connectionId }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating course: " + err.message);
    }
});
// DELETE: Remove a connection
app.delete('/connections/:connectionId', async (req, res) => {
    try {


        // console.log("Request Params :" , req.params)
           // console.log("Request Body :" , req.body)


        const connectionId = req.params.connectionId;
        const result = await connections.deleteOne({ connectionId });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting connection: " + err.message);
    }
});



// app.delete('/connections/del/:name', async (req, res) => {
//     try {
//         // console.log(name)
//         const name = (req.params.name);
//         const result = await courses.deleteOne({ name });
//         res.status(200).send(${result.deletedCount} document(s) deleted);
//     } catch (err) {
//         res.status(500).send("Error deleting course: " + err.message);
//     }
// });

