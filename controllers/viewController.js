const User = require('../models/User');
const Loan = require('../models/Loan');

exports.login = async (req, res) => {
    res.status(200).render('login');
};

exports.getLoans = async (req, res) => {
    const loans = await Loan.find();
    res.status(200).render('loansList', {loans});
};

exports.newUser = async (req, res) => {
    res.status(200).render('newUser');
};

exports.newLoan = async (req, res) => {
    res.status(200).render('newLoan');
}