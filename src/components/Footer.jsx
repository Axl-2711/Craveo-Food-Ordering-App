import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="brand">
            <span className="brand__mark" aria-hidden="true">🍽️</span>
            <span className="brand__name">FoodFood</span>
          </p>
          <p className="muted">
            A React food ordering demo — discover restaurants, build a cart and place a mock order.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>

        <div>
          <h2>Project</h2>
          <a href="https://github.com/Axl-2711/Craveo-Food-Ordering-App" target="_blank" rel="noreferrer">
            GitHub Repository
          </a>
          <p className="muted">Built with React, Vite &amp; React Router.</p>
        </div>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} FoodFood. Demo project — not a real delivery service.</p>
    </footer>
  );
}
