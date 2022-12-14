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

exports.getLoanById = async (req, res) => {
    try {
        // Get loan
        const loan = await Loan.findById(req.params.id);

        // Respond based on if loan existed
        loan ?
            // Found
            res.status(200).json({
                status: 'success',
                data: {
                    loan
                }
            }) :
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `loan not found`,
                data: {
                    loan : null
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

exports.updateLoanById = async (req, res) => {
    // Update modified date
    req.body.modifiedDate = Date.now();

    try {
        // Find user by id and update key-value pairs in the request body
        const loan = await Loan.findOneAndUpdate( 
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            });

        // Respond based on if user existed
        loan ?
            // Found
            res.status(200).json({
                status: 'success',
                data: {
                    loan
                }
            }) :
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `${urlEmail} not found`,
                data: {
                    loan : null
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

exports.deleteLoanById = async (req, res) => {
    // Update modified date
    req.body.modifiedDate = Date.now();

    try {
        // Find user by email and delete
        const loan = await Loan.findOneAndDelete(req.params.id);  

        // Respond based on if user existed
        loan ?
            // Found
            res.status(204).send() :
            // Not found
            res.status(404).json({
                status: 'fail',
                message: `loan not found`
            });
    } catch (err) {
        // Configure response to failed request
        res.status(400).json({ 
            status: 'fail', 
            message: err 
        });
    }
};