const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const loanRouter = require('./routes/loanRoutes');
const authRouter = require('./routes/authRoutes');
const {authenticate} = require('./controllers/authController');
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
    .replace('<password>', process.env.DB_PASSWORD)
    .replace('<db>', process.env.DB_NAME))
    .then(
        () => { console.log("INFO - Successfully connected to database"); },
        err => { console.log("ERROR - " + err) }
    );

// ******** middleware ********
app.use(express.json()); // parse json in request bodies
app.use(morgan('dev')); // log requests to console

// ******** routes ********
app.use('/api/v1/users', userRouter);
app.use('/api/v1/loans', authenticate, loanRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;