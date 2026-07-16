/** Formats a number as Indian rupees, e.g. 1299 -> "₹1,299". */
export function formatCurrency(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/** True if the restaurant matches a free-text query (name, cuisine, location, menu). */
export function matchesQuery(restaurant, query) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  const haystack = [restaurant.name, restaurant.location, ...restaurant.cuisine].join(' ').toLowerCase();
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
