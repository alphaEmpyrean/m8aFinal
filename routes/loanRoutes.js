const express = require('express');
const loanController = require('../controllers/loanController');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('')
    .get(loanController.getAllLoans)
    .post(loanController.createLoan);

router
    .route('/:id')
    .get(loanController.getLoanById);
    
// Make app instance avaliable for import
module.exports = router;