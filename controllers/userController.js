const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        // Create and persist new user
        var newUser = new User(req.body);
        newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
        newUser = (await newUser.save()).toJSON();
        delete newUser.passwordHash;
        
        // Configure response to successful request
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        // Configure response to failed request
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getUserByEmail = async (req, res) => {
    // Get user email from url
    const urlEmail = req.url.replace('/', '');

    try {
        // Look up user by their email address
        var user = await User.findOne( {email: urlEmail} );
        
        // Respond based on if user existed
        if (user) {
            // Found
            // Remove password hasf from object
            user = user.toJSON();
            delete user.passwordHash;

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } else {
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `${urlEmail} not found`,
                data: {
                    user : null
                }
            });
        }
    } catch (err) {
        // Configure response to failed request
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateUserByEmail = async (req, res) => {
    // Get user email from url
    const urlEmail = req.url.replace('/', '');
    // Update modified date
    req.body.modifiedDate = Date.now();

    try {
        // Find user by email and update key-value pairs in the request body
        const user = await User.findOneAndUpdate( 
            { email: urlEmail }, 
            req.body, 
            {
                new: true,
                runValidators: true
            });

        // Respond based on if user existed
        user ?
            // Found
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            }) :
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `${urlEmail} not found`,
                data: {
                    user : null
                }
            });
    } catch (err) {
        // Configure response to failed request
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteUserByEmail = async (req, res) => {
    // Get user email from url
    const urlEmail = req.url.replace('/', '');
    // Update modified date
    req.body.modifiedDate = Date.now();

    try {
        // Find user by email and delete
        const user = await User.findOneAndDelete({ email: urlEmail });  

        // Respond based on if user existed
        user ?
            // Found
            res.status(204).send() :
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `${urlEmail} not found`
            });
    } catch (err) {
        // Configure response to failed request
        res.status(400).json({ status: 'fail', message: err });
    }
};