const {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../models/transactionModel');

function validateTransaction(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }

  if (data.amount === undefined || Number.isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
    errors.push('Amount is required and must be a positive number.');
  }

  if (!['income', 'expense'].includes(data.type)) {
    errors.push('Type is required and must be either income or expense.');
  }

  if (!data.category || typeof data.category !== 'string') {
    errors.push('Category is required and must be a string.');
  }

  return errors;
}

function getTransactions(req, res) {
  const transactions = getAllTransactions();
  res.json(transactions);
}

function getTransaction(req, res) {
  const transaction = getTransactionById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found.' });
  }
  res.json(transaction);
}

function createTransaction(req, res) {
  const errors = validateTransaction(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const transaction = addTransaction(req.body);
  res.status(201).json(transaction);
}

function updateTransactionById(req, res) {
  const existing = getTransactionById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Transaction not found.' });
  }

  const errors = validateTransaction({
    title: req.body.title ?? existing.title,
    amount: req.body.amount ?? existing.amount,
    type: req.body.type ?? existing.type,
    category: req.body.category ?? existing.category,
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updated = updateTransaction(req.params.id, req.body);
  res.json(updated);
}

function deleteTransactionById(req, res) {
  const wasDeleted = deleteTransaction(req.params.id);
  if (!wasDeleted) {
    return res.status(404).json({ error: 'Transaction not found.' });
  }
  res.status(204).end();
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransactionById,
  deleteTransactionById,
};
