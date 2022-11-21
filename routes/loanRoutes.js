const express = require('express');
const loanController = require('../controllers/loanController');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('')
    .get(loanController.getAllLoans)
    .post(loanController.createLoan);

// Make app instance avaliable for import
module.exports = router;