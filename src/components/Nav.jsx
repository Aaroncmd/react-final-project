import { Link, NavLink } from "react-router-dom";

const Nav = ({ watchlistCount }) => {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link to="/" className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">⌕</div>
          <div>
            <p className="brand-name">ScreenScout</p>
            <p className="brand-subtitle">Track what to watch next</p>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Explore
          </NavLink>
          <div className="watchlist-pill">Watchlist {watchlistCount}</div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
