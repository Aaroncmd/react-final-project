import SearchBar from "../components/ui/SearchBar";
import RecentSearches from "../components/RecentSearches";
import movieHeader from "../assets/movie-header.jpg";

const Home = ({ onSearch, recentSearches, onQuickSearch }) => {
  return (
    <main className="page-shell shell">
      <section
        className="spotlight-panel card"
        style={{ backgroundImage: `url(${movieHeader})` }}
      >
        <div className="spotlight-panel__veil"></div>

        <div className="spotlight-panel__inner">
          <p className="spotlight-panel__eyebrow">ScreenScout</p>
          <h1 className="spotlight-panel__title">Find your next great watch.</h1>
          <p className="spotlight-panel__subtitle">
            Search films, series, and episodes through a cleaner cinematic experience.
          </p>

          <div className="spotlight-panel__search">
            <SearchBar onSearch={onSearch} />
          </div>

          <RecentSearches items={recentSearches} onSelect={onQuickSearch} />
        </div>
      </section>
    </main>
  );
};

export default Home;
