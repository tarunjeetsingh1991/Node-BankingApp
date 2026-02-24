const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Deposit', 'Withdrawal', 'Transfer'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fromClient: { // For withdrawals & transfers
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },
  toClient: { // For deposits & transfers
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);