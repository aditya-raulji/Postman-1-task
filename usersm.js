const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "codingtask";
const usersCollection = "users";

function main() {
    client
        .connect()
        .then(() => {
            console.log("Connected to MongoDB");
            const db = client.db(dbName);
            const users = db.collection(usersCollection);

            // Chain all operations using Promises
            return addNewUser(users)
                .then(() => updateUserDetails(users))
                .then(() => deleteUser(users))
                .then(() => listUsers(users));
        })
        .then(() => {
            client.close();
            console.log("Connection closed");
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

function addNewUser(collection) {
    const newUser = {
    
            userId: "u022",
            name: "Aditya Raulji",
            headline: "Data Scientist at frontend",
            location: "Ahemdabad, India",
            profileViews: 100,
            skills: ["Python", "Data Analysis", "Machine Learning"],
            connections: 200,
            isPremium: false,
          
    };

    return collection.insertOne(newUser).then((result) => {
        console.log("New user added:", result.insertedId);
    });
}

function updateUserDetails(collection) {
    const filter = { userId: "u022"};
    const update = {
        $set: {
            profileViews: 1020,
            skills: ["React", "Data Analysis", "Machine Learning"],
        },
    };

    return collection.updateOne(filter, update).then((result) => {
        console.log(`${result.modifiedCount} document(s) updated`);
    });
}

function deleteUser(collection) {
    const filter = {postId: "p002" };

    return collection.deleteOne(filter).then((result) => {
        console.log(`${result.deletedCount} document(s) deleted`);
    });
}

function listUsers(collection) {
    return collection.find().toArray().then((users) => {
        console.log("Current list of users:", users);
    });
}

main();