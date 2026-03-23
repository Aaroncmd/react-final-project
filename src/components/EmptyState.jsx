const EmptyState = ({ title, text, actionLabel, onAction }) => {
  return (
    <div className="empty-state card">
      <div className="empty-icon">⌕</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {actionLabel ? (
        <button type="button" className="primary-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
