// Import ExpressJS express() top level function
const express = require('express');
// Import Morgan middleware
const morgan = require('morgan');
// Import routes
const router = require('./routes/routes');

// Instantiate an application instance
const app = express();

// ******** Configure middleware ********
// Log HTTP requests -https://github.com/expressjs/morgan#readme
app.use(morgan('dev'));

// ******** Configure routes ********
app.use('/', router);

// Make app instance avaliable for import
module.exports = app;