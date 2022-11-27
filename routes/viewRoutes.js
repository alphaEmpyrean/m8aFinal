const express = require('express');
const { authenticate } = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/login', viewController.login);
router.get('/loans', authenticate, viewController.getLoans);
router.get('/new-user', viewController.newUser);
router.get('/new-loan', authenticate, viewController.newLoan);

module.exports = router;