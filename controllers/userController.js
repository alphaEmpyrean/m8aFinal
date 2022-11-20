const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        // create and persist new user
        const newUser = await (new User(req.body)).save();
        
        // configure response to successful request
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        // configure response to failed request
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // get all users
        const users = await User.find();

        // configure response to sucessful request
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        // configure response to failed request
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        // get a user by their email address
        const user = await User.findOne( {email: req.url.replace('/', '')} );
  
        // configure response to sucessful request
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        // configure response to failed request
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
  };