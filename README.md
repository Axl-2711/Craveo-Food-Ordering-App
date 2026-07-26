# Craveo — Food Ordering Web App

A responsive food ordering front end built with React, Vite and React Router. Browse restaurants,
search dishes with debounced input, filter and sort the listing, build a cart that survives a page
refresh, and place a mock order.

> Frontend-only portfolio project — no backend, no authentication, no real payments.

## Overview

Craveo simulates the customer-facing half of a food delivery product. It is deliberately scoped to
fundamentals: component architecture, hooks, global state with the Context API, routing, async data
access through a service layer, form handling and responsive CSS.

Data comes from a local mock dataset (14 restaurants, 150+ dishes) exposed through
`services/restaurantService.js`, which returns Promises with a simulated network delay. Every page
handles loading, error and empty states as if it were talking to a real API, so swapping in `fetch()`
would not require changing a single component.

## Features

- **Home page** — hero with search, clickable food categories, popular and fastest-delivery sections, promo banner
- **Restaurant listing** — debounced search plus combinable filters (cuisine, minimum rating, pure veg, price for two) and sorting (rating, delivery time, price)
- **Search** — matches restaurant names, cuisines, locations, dish names and menu categories; the debounced query is mirrored into the URL (`/restaurants?q=biryani`) so results are shareable and refresh-safe
- **Restaurant details** — cover, rating, delivery time, price for two, offers, and a menu grouped into category tabs with veg/non-veg indicators
- **Cart** — quantity steppers, remove, clear, and a live bill (subtotal, delivery fee, 5% taxes, total, free delivery above ₹499)
- **Persistence** — the cart is stored in `localStorage` and restored on load; corrupt or missing data falls back to an empty cart instead of crashing
- **Checkout** — controlled address form with per-field validation (10-digit Indian mobile, 6-digit pincode, minimum address length) and three payment options
- **Order success** — generated order ID, delivery ETA, ordered items, total and address; the cart is cleared on order placement
- **States** — skeleton loaders, error state with retry, and empty states for no results / empty cart / no recent order
- **404** — custom not-found route
- **Responsive** — mobile-first layout tested at 320, 375, 768, 1024 and 1440px; hamburger navigation and a collapsible filter panel on small screens
- **Accessibility** — semantic landmarks, labelled form fields, `aria-invalid` + `aria-describedby` on errors, `aria-pressed`/`aria-selected` on toggles, visible focus rings and reduced-motion support

## Tech Stack

| Area | Choice |
| --- | --- |
| UI library | React 18 (functional components + hooks) |
| Build tool | Vite 5 |
| Routing | React Router v6 |
| Global state | React Context API |
| Styling | Plain CSS3 with custom properties and media queries |
| Persistence | Browser `localStorage` |
| Language | JavaScript (ES6+) — no TypeScript |

No UI kit, no state management library, no debounce library.

## React Concepts Demonstrated

- Functional components and props-driven reusable UI (`RestaurantCard`, `MenuItem`, `SearchBar`, `FilterPanel`)
- `useState` for local UI state, controlled inputs and form data
- `useEffect` for data fetching, localStorage sync, URL sync and scroll restoration, each with cleanup where needed
- `useContext` via a `useCart()` wrapper hook, so components never import the context object directly
- A custom hook: `useDebounce(value, delay)` built on `setTimeout` + cleanup
- `useMemo` used only where it pays off — filtering/sorting the restaurant list and deriving cart totals
- Derived state over duplicated state: bill amounts are computed from the cart, never stored separately
- Conditional rendering for loading / error / empty / success branches
- Lists and stable keys throughout
- Routing with `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useNavigate`, `useSearchParams`, `useLocation` and a catch-all `*` route
- Passing data between routes with router `state` (order → confirmation page) with a localStorage fallback

## Project Structure

```
src/
├── components/
│   ├── CartItem.jsx          # single cart row with quantity controls
│   ├── CartSummary.jsx       # bill breakdown, reused on cart + checkout
│   ├── CategoryCard.jsx
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── FilterPanel.jsx       # presentational; state lives in the page
│   ├── Footer.jsx
│   ├── Loading.jsx           # skeleton cards
│   ├── MenuItem.jsx
│   ├── Navbar.jsx            # responsive, with hamburger + cart badge
│   ├── RestaurantCard.jsx
│   ├── RestaurantGrid.jsx
│   ├── SearchBar.jsx         # controlled or self-managed
│   ├── SortDropdown.jsx
│   └── Thumb.jsx             # food image placeholder tile
├── context/
│   └── CartContext.jsx       # cart state, actions and derived totals
├── data/
│   └── restaurants.js        # mock dataset, API-shaped
├── hooks/
│   └── useDebounce.js
├── pages/
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── OrderSuccess.jsx
│   ├── RestaurantDetails.jsx
│   └── Restaurants.jsx
├── services/
│   └── restaurantService.js  # getRestaurants, getRestaurantById, getCategories
├── utils/
│   └── helpers.js            # currency, order id, search matching, sorting
├── App.jsx                   # routes + layout shell
├── main.jsx                  # BrowserRouter + CartProvider
└── index.css                 # design tokens + all styles
```

### Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/restaurants` | Listing with search, filters, sorting |
| `/restaurant/:id` | Restaurant details and menu |
| `/cart` | Cart |
| `/checkout` | Address + payment form |
| `/order-success` | Order confirmation |
| `/about` | Project write-up |
| `*` | 404 |

## Installation

Requires Node.js 18 or newer.

```bash
git clone https://github.com/your-username/craveo.git
cd craveo
npm install
```

## Running Locally

```bash
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Screenshots

Add screenshots here after running the app locally:

| Home | Listing + filters | Restaurant menu | Cart |
| --- | --- | --- | --- |
| `docs/home.png` | `docs/listing.png` | `docs/menu.png` | `docs/cart.png` |

## Notes on Images

Dish and restaurant visuals are rendered as styled gradient tiles with an emoji (`Thumb.jsx`) rather
than remote photos. That keeps the project dependency-free and free of broken images. To use real
photography, add an `image` URL to the data and render an `<img loading="lazy" />` inside `Thumb`.

## Future Improvements

- Replace the mock service with a real REST API and add request cancellation via `AbortController`
- Restaurant-level cart validation (warn when adding items from a second restaurant)
- Address book and order history pages
- Unit tests for `CartContext` and `useDebounce` with Vitest + React Testing Library
- Route-level code splitting with `React.lazy` and `Suspense`

## Author

Built as a frontend portfolio project. Replace this section with your name, GitHub and LinkedIn.
