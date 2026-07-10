// Small local dataset for now — will be replaced by a full,
// API-shaped dataset once the service layer is wired up.
export const restaurants = [
  { id: 1, name: 'Tandoor Tales', image: '🍛', rating: 4.5, cuisine: ['Indian', 'Biryani'], deliveryTime: 32, priceForTwo: 550, location: 'Baner, Pune', isVeg: false, description: 'North Indian classics from a traditional clay tandoor.', offers: ['50% OFF up to ₹100'] },
  { id: 2, name: 'Pizza District', image: '🍕', rating: 4.3, cuisine: ['Pizza', 'Italian'], deliveryTime: 25, priceForTwo: 600, location: 'Koregaon Park, Pune', isVeg: false, description: 'Hand-stretched sourdough pizzas fired in a stone oven.', offers: ['Buy 1 Get 1 on medium pizzas'] },
  { id: 3, name: 'The Green Bowl', image: '🥗', rating: 4.6, cuisine: ['Healthy', 'Salads'], deliveryTime: 22, priceForTwo: 450, location: 'Aundh, Pune', isVeg: true, description: 'Calorie-counted bowls and salads. 100% vegetarian.', offers: ['Flat ₹75 OFF above ₹399'] },
  { id: 4, name: 'Burger Republic', image: '🍔', rating: 4.2, cuisine: ['Burgers'], deliveryTime: 20, priceForTwo: 400, location: 'Wakad, Pune', isVeg: false, description: 'Smash patties and brioche buns made in-house.', offers: [] },
];
