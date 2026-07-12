import { restaurants, categories } from '../data/restaurants';

/**
 * Service layer.
 * Components never import the data file directly — they call these
 * functions, which return Promises exactly like a real HTTP client would.
 * Swapping to `fetch('/api/restaurants')` later would not touch the UI.
 */

const NETWORK_DELAY = 500;

function respond(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), NETWORK_DELAY);
  });
}

export function getRestaurants() {
  return respond(restaurants);
}

export function getRestaurantById(id) {
  const restaurant = restaurants.find((item) => String(item.id) === String(id));
  if (!restaurant) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Restaurant not found')), NETWORK_DELAY);
    });
  }
  return respond(restaurant);
}

export function getCategories() {
  return respond(categories);
}
