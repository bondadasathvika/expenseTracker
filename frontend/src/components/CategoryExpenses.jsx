function CategoryExpenses({ categories }) {
  const totals = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const overallExpense = totals.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="panel card category-card">
      <div className="panel-heading">
        <h2>Category-wise Expense</h2>
        <p>See which categories are costing you the most.</p>
      </div>

      {totals.length === 0 ? (
        <p className="empty-state">No expense categories available yet.</p>
      ) : (
        <div className="category-list">
          {totals.map(([category, amount]) => {
            const ratio = overallExpense ? Math.min((amount / overallExpense) * 100, 100) : 0;
            return (
              <div key={category} className="category-item">
                <div className="category-label">
                  <span>{category}</span>
                  <span>${amount.toFixed(2)}</span>
                </div>
                <div className="category-bar">
                  <div className="category-progress" style={{ width: `${ratio}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryExpenses;
