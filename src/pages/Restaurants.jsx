import { restaurants } from '../data/restaurants';
import RestaurantGrid from '../components/RestaurantGrid';

export default function Restaurants() {
  return (
    <main className="container stack">
      <header className="page-head">
        <h1>Restaurants</h1>
        <p className="muted">{restaurants.length} restaurants</p>
      </header>
      <RestaurantGrid restaurants={restaurants} />
    </main>
  );
}
