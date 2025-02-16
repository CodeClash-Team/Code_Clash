const express = require("express");
const { connectToDB } = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   console.log('Body:', req.body);
//   next();
// });

let server;

const startServer = async () => {
  await connectToDB();
  app.use("/api/auth", authRoutes);
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

const endServer = async () => {
  if (server){
    server.close();
    console.log("Server closed");
    process.exit(0);
  }
};




module.exports = { app, startServer, endServer };
// startServer();
