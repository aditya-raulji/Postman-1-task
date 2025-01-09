



// this is full for posts collection

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
let db, posts;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        posts = db.collection("posts");

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

// GET: List all posts
app.get('/posts', async (req, res) => {
    try {
        const allPosts = await posts.find().toArray();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).send("Error fetching posts: " + err.message);
    }
});

// POST: Add a new posts
app.post('/posts', async (req, res) => {
    try {

        
        // console.log("Request Object :" , req)
        // console.log("Request Body :" , req.body)

        const newpost = req.body;
        const result = await posts.insertOne(newpost);
        res.status(201).send(`Post added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding posts: " + err.message);
    }
});

// PUT: Update a Post completely
app.put('/posts/:postId', async (req, res) => {
    try {

        
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)

        const postId = (req.params.postId);
        const updatedPost= req.body;
        const result = await posts.replaceOne({ postId }, updatedPost);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating post: " + err.message);
    }
});

// PATCH: Partially update a post
app.patch('/posts/:postId', async (req, res) => {
    try {

         
        //  console.log("Request Params :" , req.params)
        // console.log("Request Body :" , req.body)


        const postId = (req.params.postId);
        const updates = req.body;
        const result = await posts.updateOne({ postId }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating post: " + err.message);
    }
});

// DELETE: Remove a course
app.delete('/posts/:postId', async (req, res) => {
    try {


        // console.log("Request Params :" , req.params)
           // console.log("Request Body :" , req.body)


        const postId = req.params.postId;
        const result = await posts.deleteOne({ postId });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting post: " + err.message);
    }
});



// app.delete('/courses/del/:name', async (req, res) => {
//     try {
//         // console.log(name)
//         const name = (req.params.name);
//         const result = await courses.deleteOne({ name });
//         res.status(200).send(${result.deletedCount} document(s) deleted);
//     } catch (err) {
//         res.status(500).send("Error deleting course: " + err.message);
//     }
// });

