const express = require('express')

const{
  createClient, 
  getClients,
  getClientById, 
  updateClient,
  deleteClient,
  depositFunds,
  withdrawFunds
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

module.exports = router;