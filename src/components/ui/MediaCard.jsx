import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";

const MediaCard = ({ item, isSaved, onToggleSave }) => {
  const poster = item.Poster && item.Poster !== "N/A" ? item.Poster : placeholder;

  return (
    <article className="media-card card">
      <button
        type="button"
        className={`save-button ${isSaved ? "saved" : ""}`}
        onClick={() => onToggleSave(item)}
        aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isSaved ? "♥" : "♡"}
      </button>

      <Link to={`/details/${item.imdbID}`} className="media-card__poster-link">
        <img src={poster} alt={item.Title} className="media-card__poster" />
      </Link>

      <div className="media-card__body">
        <div className="meta-row">
          <span className="badge">{item.Type}</span>
          <span className="muted">{item.Year}</span>
        </div>

        <Link to={`/details/${item.imdbID}`} className="media-card__title-link">
          <h3>{item.Title}</h3>
        </Link>
      </div>
    </article>
  );
};

export default MediaCard;
