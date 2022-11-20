const mongoose = require('mongoose');

// create schema that will be converted into a model
const schemaUser = new mongoose.Schema({
  id:  String,
  name: {
    firstName: String,
    middleName: String,
    lastName: String
  },
  email: String,
  dateOfBirth: Date,
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  isDeleted: Boolean
});

// create model from schema, models allow us to create persistable mongodb documents
const modelUser = mongoose.model('User', schemaUser);

module.exports = modelUser;
