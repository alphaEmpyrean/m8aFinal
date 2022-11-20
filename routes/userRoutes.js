const express = require('express');
const userController = require('../controllers/userController');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route(/.*@*.*$/)
    .get(userController.getUserByEmail);

// Make app instance avaliable for import
module.exports = router;