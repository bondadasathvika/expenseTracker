const express = require('express');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransactionById,
  deleteTransactionById,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransactionById);
router.delete('/:id', deleteTransactionById);

module.exports = router;
