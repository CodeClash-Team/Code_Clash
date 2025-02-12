const bycrypt = require("bcryptjs");
const { getDB } = require("../config/db");

const registerController = async (req, res) => {
  console.log("Received register request with:", req.body);
  const {username, password} = req.body;

  if (!username && !password) {
    return res.status(400).json({error: "Username and password are required"});
  } else if (!username) {
    return res.status(400).json({error: "Username not given"});
  } else if (!password){
    return res.status(400).json({error: "Password not given"});
  }

  const db = getDB();
  const existingUser = await db.collection("users").findOne( {username: username} );

  if (existingUser){
    return res.status(400).json({error: "Username taken"});
  }

  const hashedPassword = await bycrypt.hash(password, 10);

  await db.collection("users").insertOne({
    username: username,
    password: hashedPassword
  });

  return res.status(201).json({message: "Account created successfully"});
};

module.exports = registerController;
