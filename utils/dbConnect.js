const { MongoClient } = require("mongodb");
require('dotenv').config({ path: './.env' });

const connectionString = process.env.ATLAS_URI;
console.log("connectionString!", connectionString);

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

async function connectToServer() {
  try {
    await client.connect();
    dbConnection = client.db(); // Assign the database connection to dbConnection
    console.log("Successfully Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error("Database connection not established.");
  }
  return dbConnection;
}

module.exports = { connectToServer, getDb };



// const { MongoClient, ServerApiVersion } = require('mongodb');
// function dbConnect() {
//     const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.roc0q.mongodb.net/?retryWrites=true&w=majority`;
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//     console.log('I am from DB Page !');

    
// }
// module.exports = dbConnect();