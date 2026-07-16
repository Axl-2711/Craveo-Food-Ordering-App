import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  const navigate = useNavigate();

  function handleSearch(query) {
    navigate(`/restaurants?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">🍽️</span>
          <span className="brand__name">Craveo</span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/restaurants">Restaurants</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="navbar__search">
          <SearchBar onSubmit={handleSearch} placeholder="Search food or restaurants" />
        </div>

        <Link to="/cart" className="cart-button" aria-label="Cart">
          <span aria-hidden="true">🛒</span>
          <span className="cart-button__label">Cart</span>
        </Link>
      </div>
    </header>
  );
}
