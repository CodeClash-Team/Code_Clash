const { getDB } = require("../config/db")

const loginController = async (req, res) => {
    console.log('Received login request with:', req.body);
    const {username, password} = req.body;
    
    if (!username && !password) {
        return res.status(400).json({error: "Username and password are required"})
    } else if (!username) {
        return res.status(400).json({error: "Username not given"})
    } else if (!password){
        return res.status(400).json({error: "Password not given"})
    }

    return res.status(200).json({message: "Login and username both given"})
}

module.exports = loginController;