import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BalanceCard from '../components/BalanceCard.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import CategoryExpenses from '../components/CategoryExpenses.jsx';


const API_URL = 'http://localhost:5000/api/transactions';

function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(API_URL);
      setTransactions(response.data);
    } catch (err) {
      setError('Unable to load transactions. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTransaction = async (formData) => {
    setError('');

    try {
      if (isEditing && selectedTransaction) {
        const response = await axios.put(`${API_URL}/${selectedTransaction.id}`, formData);
        setTransactions((current) => current.map((item) => (item.id === response.data.id ? response.data : item)));
      } else {
        const response = await axios.post(API_URL, formData);
        setTransactions((current) => [response.data, ...current]);
      }
      setSelectedTransaction(null);
      setIsEditing(false);
    } catch (err) {
      const message = err.response?.data?.errors?.join(' ') || err.response?.data?.error || 'Failed to save transaction.';
      setError(message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    setError('');

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions((current) => current.filter((transaction) => transaction.id !== id));
    } catch (err) {
      setError('Unable to delete the transaction.');
    }
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditing(true);
  };

  const summary = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0);
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0);
    const balance = income - expense;

    const categoryTotals = transactions
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
        return acc;
      }, {});

    return { income, expense, balance, categoryTotals };
  }, [transactions]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="dashboard-container">
        <section className="summary-row">
          <BalanceCard balance={summary.balance} />
          <SummaryCard label="Total Income" amount={summary.income} type="income" />
          <SummaryCard label="Total Expense" amount={summary.expense} type="expense" />
        </section>

        <section className="content-grid">
          <div className="form-panel">
            <TransactionForm
              onSave={handleSaveTransaction}
              onCancel={() => {
                setSelectedTransaction(null);
                setIsEditing(false);
              }}
              isEditing={isEditing}
              transaction={selectedTransaction}
              error={error}
            />
          </div>

          <div className="transaction-panel">
            <div className="transaction-header">
              <h2>Transaction History</h2>
              <p>{loading ? 'Loading...' : `${transactions.length} records found`}</p>
            </div>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
            />
          </div>
        </section>

        <section className="category-row">
          <CategoryExpenses categories={summary.categoryTotals} />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
