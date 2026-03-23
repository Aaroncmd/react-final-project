import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import { getTitleDetails } from "../services/omdb";

const TitleDetails = ({ watchlist, onToggleWatchlist }) => {
  const { imdbID } = useParams();
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isSaved = useMemo(
    () => watchlist.some((item) => item.imdbID === imdbID),
    [watchlist, imdbID]
  );

  useEffect(() => {
    let ignore = false;

    async function loadTitle() {
      setLoading(true);
      setError("");

      try {
        const data = await getTitleDetails(imdbID);
        if (!ignore) {
          setTitle(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Could not fetch title details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTitle();

    return () => {
      ignore = true;
    };
  }, [imdbID]);

  if (loading) {
    return (
      <main className="page-shell shell">
        <div className="details-layout card loading-card">
          <div className="poster-skeleton shimmer"></div>
          <div className="details-skeleton">
            <div className="line shimmer"></div>
            <div className="line short shimmer"></div>
            <div className="line shimmer"></div>
            <div className="line shimmer"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !title) {
    return (
      <main className="page-shell shell">
        <div className="card error-state">
          <h2>Could not load that title</h2>
          <p>{error || "Something went wrong."}</p>
          <Link to="/explore" className="text-link">Back to explore</Link>
        </div>
      </main>
    );
  }

  const poster = title.Poster && title.Poster !== "N/A" ? title.Poster : placeholder;

  return (
    <main className="page-shell shell">
      <section className="details-layout card">
        <div className="details-poster-wrap">
          <img src={poster} alt={title.Title} className="details-poster" />
        </div>

        <div className="details-copy">
          <Link to="/explore" className="text-link">← Back to explore</Link>
          <div className="title-header-row">
            <div>
              <p className="eyebrow">{title.Type}</p>
              <h1 className="section-title left">{title.Title}</h1>
            </div>
            <button
              type="button"
              className={`save-button details-save ${isSaved ? "saved" : ""}`}
              onClick={() => onToggleWatchlist({
                imdbID: title.imdbID,
                Title: title.Title,
                Poster: title.Poster,
                Year: title.Year,
                Type: title.Type,
              })}
            >
              {isSaved ? "In watchlist ♥" : "Save ♡"}
            </button>
          </div>

          <div className="detail-badges">
            <span className="badge">{title.Year}</span>
            <span className="badge">{title.Rated}</span>
            <span className="badge">{title.Runtime}</span>
            <span className="badge">IMDb {title.imdbRating}</span>
          </div>

          <p className="plot-text">{title.Plot}</p>

          <div className="info-grid">
            <div>
              <span className="info-label">Genre</span>
              <p>{title.Genre}</p>
            </div>
            <div>
              <span className="info-label">Released</span>
              <p>{title.Released}</p>
            </div>
            <div>
              <span className="info-label">Director</span>
              <p>{title.Director}</p>
            </div>
            <div>
              <span className="info-label">Writer</span>
              <p>{title.Writer}</p>
            </div>
            <div>
              <span className="info-label">Cast</span>
              <p>{title.Actors}</p>
            </div>
            <div>
              <span className="info-label">Language</span>
              <p>{title.Language}</p>
            </div>
            <div>
              <span className="info-label">Awards</span>
              <p>{title.Awards}</p>
            </div>
            <div>
              <span className="info-label">Box office</span>
              <p>{title.BoxOffice}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TitleDetails;
