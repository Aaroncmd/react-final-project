const ResultToolbar = ({ count, activeSort, onSortChange, favoritesOnly, onToggleFavoritesOnly }) => {
  return (
    <div className="results-toolbar card">
      <div>
        <p className="eyebrow">Search results</p>
        <h2>{count} title{count === 1 ? "" : "s"} found</h2>
      </div>

      <div className="toolbar-actions">
        <label className="toggle-pill">
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(event) => onToggleFavoritesOnly(event.target.checked)}
          />
          <span>Watchlist only</span>
        </label>

        <select value={activeSort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="relevance">Best match</option>
          <option value="year-desc">Newest year</option>
          <option value="year-asc">Oldest year</option>
          <option value="title-asc">A → Z</option>
          <option value="title-desc">Z → A</option>
          <option value="type">Group by format</option>
        </select>
      </div>
    </div>
  );
};

export default ResultToolbar;
