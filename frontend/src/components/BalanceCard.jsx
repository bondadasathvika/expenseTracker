function BalanceCard({ balance }) {
  return (
    <article className="balance-card card">
      <h2>Balance</h2>
      <p className="balance-value">${balance.toFixed(2)}</p>
      <span className="card-meta">Current financial position</span>
    </article>
  );
}

export default BalanceCard;
