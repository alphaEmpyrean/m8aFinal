// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        // Get the user tied to the email
        const user = await User.findOne( {email: req.body.email} );

        // Check password
        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);
        
        if (isValidPassword) {
            // Build token
            const token = jwt.sign(
                { _id: user._id }, 
                process.env.JWT_SECRET_KEY, 
                { expiresIn: '10m' });

            // Store the token clientside in an http only secure cookie and
            // redirect to /loans
            res.status(200).header("Set-Cookie", `access_token=${token};HttpOnly;Path=/`).redirect('/loans');
        } else {
            res.status(400).send("Email or password is incorrect");
        } 
    } catch (err) {
        res.status(400).send("Email or password is incorrect");
    }    
};

exports.authenticate = async (req, res, next) => {
    // Convert cookie string to a json object
    const cookies = (req.headers.cookie) ? 
        req.headers.cookie.split(';')
            .reduce((prev, current) => {
                const [name, ...value] = current.split('=');
                prev[name] = value.join('=');
                return prev;
            }, {}) : 
        undefined;

    // Pull the access_token out from the cookies
    if (cookies && 'access_token' in cookies) {
        const { access_token } = cookies;

        try {
            // Ensure access token contains user
            const verifiedData = jwt.verify(
                access_token,
                process.env.JWT_SECRET_KEY                
            );
            req.verifiedData = verifiedData;
            next();
        } catch (err) {
            res.status(400).send('Invalid Token');
        }        
    } else {
        res.status(401).send();
    }
};