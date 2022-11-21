const mongoose = require('mongoose');

// Create schema that will be converted into a model
const loanSchema = new mongoose.Schema({
  id:  String,
  userId: 
  { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  loanType: String,
  amount: Number,
  interestRate: Number,
  loanTerm: Number,
  startDate: Date,
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  isDeleted: Boolean
});

// Create model from schema, models allow us to create persistable mongodb documents
const loanModel = mongoose.model('Loan', loanSchema);

module.exports = loanModel;
