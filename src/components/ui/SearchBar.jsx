import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, initialValue = "", compact = false }) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const cleaned = query.trim();

    if (!cleaned) {
      return;
    }

    await onSearch(cleaned);
    navigate("/explore");
  }

  return (
    <form onSubmit={handleSubmit} className={`search-form ${compact ? "compact" : ""}`}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search films, series, episodes..."
        aria-label="Search titles"
      />
      <button type="submit" className="primary-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
