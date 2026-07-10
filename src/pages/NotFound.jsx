import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container stack">
      <div className="state">
        <span className="state__icon" aria-hidden="true">🍳</span>
        <h1>404 — page not on the menu</h1>
        <p className="muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Link className="btn btn--primary" to="/">Back to Home</Link>
      </div>
    </main>
  );
}
