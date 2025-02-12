const bycrypt = require("bcryptjs");
const { getDB } = require("../config/db");

const loginController = async (req, res) => {
  console.log("Received login request with:", req.body);
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
    const passwordValid = await bycrypt.compare(password, existingUser.password);
    if (passwordValid) {
      return res.status(200).json({message: "Username and password correct"});
    } else {
      return res.status(400).json({error: "Username or password incorrect"});

    }
  } else{
    return res.status(400).json({error: "Username or password incorrect"});
  }
};

module.exports = loginController;
