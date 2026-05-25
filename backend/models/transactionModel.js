const { v4: uuidv4 } = require('uuid');

// In-memory transaction storage with sample data
const transactions = [
  {
    id: uuidv4(),
    title: 'Freelance Project',
    amount: 2600,
    type: 'income',
    category: 'Business',
    date: new Date('2026-05-22T10:30:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Groceries',
    amount: 120,
    type: 'expense',
    category: 'Food',
    date: new Date('2026-05-23T16:45:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Gym Membership',
    amount: 50,
    type: 'expense',
    category: 'Health',
    date: new Date('2026-05-24T08:00:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Savings Interest',
    amount: 85,
    type: 'income',
    category: 'Savings',
    date: new Date('2026-05-24T14:20:00Z').toISOString(),
  },
];

function getAllTransactions() {
  return transactions;
}

function getTransactionById(id) {
  return transactions.find((transaction) => transaction.id === id);
}

function addTransaction(data) {
  const transaction = {
    id: uuidv4(),
    title: data.title,
    amount: Number(data.amount),
    type: data.type,
    category: data.category,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
  };
  transactions.push(transaction);
  return transaction;
}

function updateTransaction(id, data) {
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index === -1) {
    return null;
  }

  transactions[index] = {
    ...transactions[index],
    title: data.title ?? transactions[index].title,
    amount: data.amount !== undefined ? Number(data.amount) : transactions[index].amount,
    type: data.type ?? transactions[index].type,
    category: data.category ?? transactions[index].category,
    date: data.date ? new Date(data.date).toISOString() : transactions[index].date,
  };

  return transactions[index];
}

function deleteTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index === -1) {
    return false;
  }

  transactions.splice(index, 1);
  return true;
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
