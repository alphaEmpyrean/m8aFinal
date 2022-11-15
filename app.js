const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const dotenv = require('dotenv');

// Instantiate an application instance
const app = express();

// ******** Configure Application Instance ********
// Set path to args file
dotenv.config({path: './config.env' });

// ******** middleware ********
app.use(morgan('dev'));

// ******** routes ********
app.use('/', router);

// Make app instance avaliable for import
module.exports = app;