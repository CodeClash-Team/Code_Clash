const express = require("express");
const { connectToDB } = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const startServer = async () => {
  await connectToDB();
  app.use("/api/auth", authRoutes);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
