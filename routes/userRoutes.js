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
    .route(/.*@*.*$/) // super basic regex to match email addresses
    .get(userController.getUserByEmail)
    .patch(userController.updateUserByEmail)
    .delete(userController.deleteUserByEmail);

// Make app instance avaliable for import
module.exports = router;