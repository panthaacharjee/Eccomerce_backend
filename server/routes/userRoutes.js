const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userControllersl');
const router = express.Router();

// Register User
router.route("/register").post(registerUser);
router.route("/login").get(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;