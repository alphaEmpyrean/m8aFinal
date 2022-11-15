const express = require('express');

// Get a router within the express appliaction
const router = express.Router();

// Create root route
router
    .route('/')
    .get((req, res) => {
        return res.status(200).send("<p>Hello World!</p>");
    });

module.exports = router;