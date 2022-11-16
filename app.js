const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Instantiate an application instance
const app = express();

// ******** APP CONFIG ********
// Set path to args file
dotenv.config({path: './config.env' });

// ******** database ********
// Connect to mongodb
mongoose.connect(process.env.MONGODB_CLUSTER_URI
    .replace('<password>', process.env.DB_PASSWORD))
    .then(
        () => {
            // Set database
            mongoose.connection = mongoose.connection.useDb(process.env.DB_NAME);
            console.log("INFO - Successfully connected to database");},
        err => { console.log("ERROR - " + err) }
    );

// ******** middleware ********
app.use(morgan('dev'));

// ******** routes ********
app.use('/', router);

module.exports = app;