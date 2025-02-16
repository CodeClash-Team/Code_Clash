const { Router } = require("express");
const router = Router();
const loginController = require("../controllers/login-controller");
const registerController = require("../controllers/register-controller");

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
