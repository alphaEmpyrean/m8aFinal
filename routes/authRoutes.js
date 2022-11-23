const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('/register')
    .post(userController.createUser); // Same functionality as user endpoint but no auth

router
    .route('/login')
    .post(authController.login);

// Make app instance avaliable for import
module.exports = router;