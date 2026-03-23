import { useNavigate } from "react-router-dom";

const RecentSearches = ({ items, onSelect }) => {
  const navigate = useNavigate();

  if (!items.length) {
    return null;
  }

  async function handleClick(item) {
    await onSelect(item);
    navigate("/explore");
  }

  return (
    <div className="recent-searches">
      <p className="eyebrow">Recent searches</p>
      <div className="chip-row">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="chip"
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
