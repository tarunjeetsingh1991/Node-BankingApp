const express = require('express')

const{
  createClient, 
  getClients,
  getClientById, 
  updateClient,
  deleteClient,
  depositFunds,
  withdrawFunds,
  transferFunds,
  getTransactionHistory
} = require('../controllers/clientController');

const router = express.Router();

//Each route requires authentication

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.post('/:id/deposit', depositFunds);
router.post('/:id/withdraw', withdrawFunds);

router.post('/:id/transfer', transferFunds);
router.get('/:id/transactions', getTransactionHistory);

module.exports = router;