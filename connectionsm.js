const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "codingtask";
const connectionsCollection = "connections";

function main() {
    client
        .connect()
        .then(() => {
            console.log("Connected to MongoDB");
            const db = client.db(dbName);
            const connections = db.collection(connectionsCollection);

            // Chain all operations using Promises
            return addNewConnection(connections)
                .then(() => updateConnectionDetails(connections))
                .then(() => deleteConnection(connections))
                .then(() => listConnections(connections));
        })
        .then(() => {
            client.close();
            console.log("Connection closed");
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

function addNewConnection(collection) {
    const newConnection = {
    
        connectionId: "c008",
         user1: "u0047",
          user2: "u009",
           status: "Aditya" 
          
    };

    return collection.insertOne(newConnection).then((result) => {
        console.log("New connection added:", result.insertedId);
    });
}

function updateConnectionDetails(collection) {
    const filter = { connectionId: "c008"};
    const update = {
        $set: {
            user2: "u0094",
           status: "Aaditya" 
        },
    };

    return collection.updateOne(filter, update).then((result) => {
        console.log(`${result.modifiedCount} document(s) updated`);
    });
}

function deleteConnection(collection) {
    const filter = {connectionId: "u0094" };

    return collection.deleteOne(filter).then((result) => {
        console.log(`${result.deletedCount} document(s) deleted`);
    });
}

function listConnections(collection) {
    return collection.find().toArray().then((connections) => {
        console.log("Current list of connections:", connections);
    });
}

main();
