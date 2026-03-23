import { useMemo, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import MediaCard from "../components/ui/MediaCard";
import ResultToolbar from "../components/ResultToolbar";
import EmptyState from "../components/EmptyState";

function sortItems(items, sortMode) {
  const sorted = [...items];

  switch (sortMode) {
    case "year-desc":
      return sorted.sort((a, b) => Number(b.Year) - Number(a.Year));
    case "year-asc":
      return sorted.sort((a, b) => Number(a.Year) - Number(b.Year));
    case "title-asc":
      return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    case "title-desc":
      return sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    case "type":
      return sorted.sort((a, b) => a.Type.localeCompare(b.Type) || a.Title.localeCompare(b.Title));
    default:
      return sorted;
  }
}

const Explore = ({
  items,
  onSearch,
  watchlist,
  onToggleWatchlist,
  lastQuery,
  error,
}) => {
  const [sortMode, setSortMode] = useState("relevance");
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  const visibleItems = useMemo(() => {
    const baseItems = watchlistOnly
      ? items.filter((item) => watchlist.some((saved) => saved.imdbID === item.imdbID))
      : items;

    return sortItems(baseItems, sortMode);
  }, [items, sortMode, watchlistOnly, watchlist]);

  return (
    <main className="page-shell shell">
      <section className="stack-lg">
        <div className="explore-header card">
          <div>
            <p className="eyebrow">Explore</p>
            <h1 className="section-title">Browse titles without losing your place.</h1>
            <p className="supporting-text">
              {lastQuery ? `Showing matches for “${lastQuery}”.` : "Run a search to start scouting titles."}
            </p>
          </div>
          <SearchBar onSearch={onSearch} initialValue={lastQuery} compact />
        </div>

        <ResultToolbar
          count={visibleItems.length}
          activeSort={sortMode}
          onSortChange={setSortMode}
          favoritesOnly={watchlistOnly}
          onToggleFavoritesOnly={setWatchlistOnly}
        />

        {error ? <p className="error-banner">{error}</p> : null}

        {visibleItems.length ? (
          <section className="results-grid">
            {visibleItems.map((item) => (
              <MediaCard
                key={item.imdbID}
                item={item}
                isSaved={watchlist.some((saved) => saved.imdbID === item.imdbID)}
                onToggleSave={onToggleWatchlist}
              />
            ))}
          </section>
        ) : (
          <EmptyState
            title={watchlistOnly ? "No saved titles in these results yet" : "Nothing to show yet"}
            text={watchlistOnly ? "Save a few titles to your watchlist, then flip this filter back on." : "Try a search like Interstellar, The Bear, or Sherlock."}
          />
        )}
      </section>
    </main>
  );
};

export default Explore;
