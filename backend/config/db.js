const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db();
    console.log("Connected to the database!");
  } catch(error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialised");
  }
  return db;
};

module.exports = { connectToDB, getDB };
