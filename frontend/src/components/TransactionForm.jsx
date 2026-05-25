import { useEffect, useState } from 'react';

const defaultState = {
  title: '',
  amount: '',
  type: 'expense',
  category: '',
  date: '',
};

function TransactionForm({ onSave, onCancel, transaction, isEditing, error }) {
  const [form, setForm] = useState(defaultState);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (transaction) {
      setForm({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date ? transaction.date.slice(0, 16) : '',
      });
    } else {
      setForm(defaultState);
    }
  }, [transaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.amount || !form.category.trim()) {
      setFormError('Please complete all fields before submitting.');
      return;
    }

    if (Number(form.amount) <= 0) {
      setFormError('Amount must be a positive value.');
      return;
    }

    onSave({
      ...form,
      amount: Number(form.amount),
      date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
    });
    setForm(defaultState);
  };

  return (
    <div className="panel card form-card">
      <div className="panel-heading">
        <h2>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <p>Track income and expenses in a simple form.</p>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        {formError && <div className="alert error">{formError}</div>}
        {error && <div className="alert error">{error}</div>}

        <label>
          Title
          <input name="title" type="text" value={form.title} onChange={handleChange} placeholder="Salary, Rent, Groceries" />
        </label>

        <label>
          Amount
          <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0.00" />
        </label>

        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category
          <input name="category" type="text" value={form.category} onChange={handleChange} placeholder="Business, Food, Travel" />
        </label>

        <label>
          Date & Time
          <input name="date" type="datetime-local" value={form.date} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
