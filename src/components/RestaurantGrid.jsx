import RestaurantCard from './RestaurantCard';

export default function RestaurantGrid({ restaurants }) {
  return (
    <div className="grid grid--restaurants">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
