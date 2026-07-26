import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="container stack">
      <header className="page-head">
        <h1>About Craveo</h1>
        <p className="muted">A frontend portfolio project built to demonstrate core React skills.</p>
      </header>

      <section className="card prose">
        <h2>What it does</h2>
        <p>
          Craveo is a food ordering web app. You can discover restaurants, search food and cuisines,
          filter and sort the listing, open a restaurant menu, add dishes to a persistent cart,
          check out with a validated address form and receive a mock order confirmation.
        </p>

        <h2>Tech stack</h2>
        <ul>
          <li><strong>React 18</strong> with functional components and hooks</li>
          <li><strong>Vite</strong> for dev server and bundling</li>
          <li><strong>React Router v6</strong> for client-side routing</li>
          <li><strong>Context API</strong> for global cart state</li>
          <li><strong>Plain CSS</strong> with custom properties and media queries</li>
          <li><strong>localStorage</strong> for cart and last-order persistence</li>
        </ul>

        <h2>Architecture</h2>
        <p>
          Components are split into reusable UI pieces (<code>components/</code>) and route-level
          screens (<code>pages/</code>). Data access lives in <code>services/restaurantService.js</code>,
          which returns Promises just like a real HTTP client, so components are written against an
          async API rather than a local array. Pages track a simple
          <code> loading | success | error</code> status and render skeletons, error states or empty
          states accordingly.
        </p>

        <h2>Search</h2>
        <p>
          A single search box matches restaurant names, cuisines, locations, menu item names and menu
          categories. Typing updates local state immediately, but the actual filtering runs through a
          custom <code>useDebounce()</code> hook with a 400ms delay, so a fast typist triggers one
          filter pass instead of a dozen. The debounced value is also mirrored into the URL query
          string, which makes searches shareable and refresh-safe.
        </p>

        <h2>Cart state</h2>
        <p>
          <code>CartContext</code> owns the cart array and exposes <code>addToCart</code>,
          <code> removeFromCart</code>, <code>increaseQuantity</code>, <code>decreaseQuantity</code>
          and <code>clearCart</code>. Bill values — item count, subtotal, delivery fee, taxes and
          grand total — are derived from the cart with <code>useMemo</code> rather than stored as
          separate state, so they can never drift out of sync.
        </p>

        <h2>Persistence</h2>
        <p>
          The cart is read from localStorage once during the initial render and written back on every
          change via <code>useEffect</code>. Reads are wrapped in try/catch and validated, so missing
          or corrupted data degrades to an empty cart instead of crashing the app.
        </p>

        <h2>Responsive design</h2>
        <p>
          The layout is built mobile-first and tested from 320px to 1440px. The restaurant grid moves
          from one to four columns, the navbar collapses into a hamburger menu, the filter panel
          becomes a collapsible section, and the cart and checkout columns stack.
        </p>

        <p>
          <Link className="btn btn--primary" to="/restaurants">Explore the app</Link>
        </p>
      </section>
    </main>
  );
}
