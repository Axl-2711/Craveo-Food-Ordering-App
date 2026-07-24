/** Formats a number as Indian rupees, e.g. 1299 -> "₹1,299". */
export function formatCurrency(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/** Generates a readable mock order id, e.g. "CRV-4821K9". */
export function generateOrderId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CRV-${random}`;
}

/** Returns a delivery window such as "35 - 45 min". */
export function deliveryWindow(minutes = 30) {
  return `${minutes} - ${minutes + 10} min`;
}

/** True if the restaurant matches a free-text query (name, cuisine, location, menu). */
export function matchesQuery(restaurant, query) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  const haystack = [
    restaurant.name, restaurant.location, ...restaurant.cuisine,
    ...restaurant.menu.map((item) => item.name),
    ...restaurant.menu.map((item) => item.category),
  ].join(' ').toLowerCase();
  return haystack.includes(term);
}

/** Sorts a copy of the list by the given key. */
export function sortRestaurants(list, sortBy) {
  const copy = [...list];
  if (sortBy === 'rating') return copy.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'delivery') return copy.sort((a, b) => a.deliveryTime - b.deliveryTime);
  if (sortBy === 'price') return copy.sort((a, b) => a.priceForTwo - b.priceForTwo);
  return copy;
}

export const PRICE_RANGES = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'low', label: 'Under ₹400', test: (price) => price < 400 },
  { id: 'mid', label: '₹400 - ₹600', test: (price) => price >= 400 && price <= 600 },
  { id: 'high', label: 'Above ₹600', test: (price) => price > 600 },
];
