const express = require("express");
const router = express.Router();

const {signupUser,loginUser,userRole} = require("../controllers/userController")

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
router.route("/userRole").get(userRole)

module.exports  = router