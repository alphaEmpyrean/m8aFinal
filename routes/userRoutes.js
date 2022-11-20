const express = require('express');
const userController = require('../controllers/userController');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('')
    .get(userController.getAllUsers)
    .post(userController.createUser);

// Make app instance avaliable for import
module.exports = router;