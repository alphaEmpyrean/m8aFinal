const Loan = require('../models/Loan');

exports.createLoan = async (req, res) => {
    try {
        // Create and persist new loan
        const newLoan = await (new Loan(req.body)).save();
        
        // Configure response to successful request
        res.status(201).json({
            status: 'success',
            data: {
                loan: newLoan
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

exports.getAllLoans = async (req, res) => {
    try {
        // Create and persist new loan
        const loans = await Loan.find();
        
        // Configure response to successful request
        res.status(200).json({
            status: 'success',
            data: {
                loans
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