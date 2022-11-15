// Import ExpressJS express() top level function
const express = require('express');
// Import routes
const router = require('./routes/routes');

// Instantiate an application instance
const app = express();

// Add a route to the application
app.use('/', router);

// Make app instance avaliable for import
module.exports = app;