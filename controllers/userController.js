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
        // get user email from url
        const urlEmail = req.url.replace('/', '');

        // look up user by their email address
        const user = await User.findOne( {email: urlEmail} );
  
        // configure response to sucessful request
        user ?
        // found
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        }) :
        // not found
        res.status(404).json({
            status: 'fail',
            message: `${urlEmail} not found`,
            data: {
                user : null
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

exports.updateUserbyEmail = async (req, res) => {
    // get user email from url
    const urlEmail = req.url.replace('/', '');
    // update modified date
    req.body.modifiedDate = Date.now();

    try {
        // find user by email and update key-value pairs in the request body
        const user = await User.findOneAndUpdate( 
            { email: req.url.replace('/', '') }, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );  
        // configure response to sucessful request
        user ?
        // found
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        }) :
        // not found
        res.status(404).json({
            status: 'fail',
            message: `${urlEmail} not found`,
            data: {
                user : null
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