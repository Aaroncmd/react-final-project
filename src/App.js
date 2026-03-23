import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import TitleDetails from "./pages/TitleDetails";
import useStoredState from "./hooks/useStoredState";
import { searchTitles } from "./services/omdb";
import "./App.css";

const MAX_RECENT_SEARCHES = 5;

function App() {
  const [results, setResults] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useStoredState("screenscout_recent_searches", []);
  const [watchlist, setWatchlist] = useStoredState("screenscout_watchlist", []);

  const runSearch = useCallback(async (query) => {
    const cleaned = query.trim();
    if (!cleaned) return;

    setLastQuery(cleaned);
    setError("");

    const { items, error: searchError } = await searchTitles(cleaned);
    setResults(items);
    setError(searchError);
    setRecentSearches((previous) => [cleaned, ...previous.filter((item) => item !== cleaned)].slice(0, MAX_RECENT_SEARCHES));
  }, [setRecentSearches]);

  const toggleWatchlist = useCallback((item) => {
    setWatchlist((previous) => {
      const exists = previous.some((saved) => saved.imdbID === item.imdbID);
      return exists
        ? previous.filter((saved) => saved.imdbID !== item.imdbID)
        : [item, ...previous];
    });
  }, [setWatchlist]);

  return (
    <Router>
      <div className="app-shell">
        <Nav watchlistCount={watchlist.length} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSearch={runSearch}
                recentSearches={recentSearches}
                onQuickSearch={runSearch}
                watchlistCount={watchlist.length}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                items={results}
                onSearch={runSearch}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
                lastQuery={lastQuery}
                error={error}
              />
            }
          />
          <Route
            path="/details/:imdbID"
            element={<TitleDetails watchlist={watchlist} onToggleWatchlist={toggleWatchlist} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
