import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleSearch(query) {
    setIsMenuOpen(false);
    navigate(`/restaurants?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="brand" onClick={() => setIsMenuOpen(false)}>
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

        <div className="navbar__actions">
          <Link to="/cart" className="cart-button" aria-label={`Cart, ${itemCount} items`}>
            <span aria-hidden="true">🛒</span>
            <span className="cart-button__label">Cart</span>
            {itemCount > 0 && <span className="cart-button__badge">{itemCount}</span>}
          </Link>

          <button
            type="button"
            className="hamburger"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="container">
            <SearchBar onSubmit={handleSearch} placeholder="Search food or restaurants" />
            <nav className="mobile-menu__links" aria-label="Mobile">
              <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/restaurants" onClick={() => setIsMenuOpen(false)}>Restaurants</NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({itemCount})</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
