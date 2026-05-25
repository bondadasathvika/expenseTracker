function TransactionList({ transactions, onDelete, onEdit }) {
  if (!transactions.length) {
    return <p className="empty-state">No transactions yet. Add one to begin tracking.</p>;
  }

  return (
    <div className="transaction-list">
      {transactions
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((transaction) => (
          <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-info">
              <h3>{transaction.title}</h3>
              <span className="transaction-meta">
                {transaction.category} • {new Date(transaction.date).toLocaleString()}
              </span>
            </div>
            <div className="transaction-right">
              <span className="transaction-amount">
                {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
              </span>
              <div className="transaction-actions">
                <button className="btn-link" onClick={() => onEdit(transaction)}>
                  Edit
                </button>
                <button className="btn-link danger" onClick={() => onDelete(transaction.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TransactionList;
