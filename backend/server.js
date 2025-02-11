const express = require("express");
const { connectToDB } = require("./config/db"); // Adjust path if needed
const authRoutes = require("./routes/auth")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const startServer = async () => {
  await connectToDB(); // Ensures DB is connected before handling requests
  app.use('/api/auth', authRoutes);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
