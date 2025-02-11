const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
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

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialised");
  }
  return db;
};

module.exports = { connectToDB, getDb };
