const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // Import controllers

// Register - Use controller function
router.post("/register", registerUser);

// Login - Use controller function
router.post("/login", loginUser);

module.exports = router;
