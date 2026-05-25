function SummaryCard({ label, amount, type }) {
  return (
    <article className={`summary-card card ${type}`}>
      <div>
        <h3>{label}</h3>
        <p className="summary-value">${amount.toFixed(2)}</p>
      </div>
      <span className="card-meta">Tracked through all entries</span>
    </article>
  );
}

export default SummaryCard;
