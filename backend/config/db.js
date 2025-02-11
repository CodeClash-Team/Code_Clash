const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db();
    console.log("Connected to the database!");
  } catch(error) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  }
};

console.log("uri", uri);
connectToDB();