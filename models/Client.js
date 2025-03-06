const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required : true,
  },
  kycStatus: 
  {
    type: String, enum:['Pending', 'Verified', 'Rejected'], default: 'Pending'
  },
  accountNumber: 
  {
    type: String,
    required: true,
    unique: true
  },
  accountBalance:
  {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Client', ClientSchema);