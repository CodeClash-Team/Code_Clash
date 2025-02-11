const express = require("express");
const path = require("path")
const { connectToDB } = require(path.resolve(__dirname + "/config/db")); // Adjust path if needed

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDB(); // Ensures DB is connected before handling requests
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
