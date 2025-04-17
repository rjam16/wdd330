// routes/authRoute.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Optional: Logout route (if you're using sessions)
router.post('/logout', authController.logout);

module.exports = router;
