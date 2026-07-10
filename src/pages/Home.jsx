import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import RestaurantGrid from '../components/RestaurantGrid';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { id: 'pizza', label: 'Pizza', image: '🍕' },
  { id: 'indian', label: 'Indian', image: '🍛' },
  { id: 'healthy', label: 'Healthy', image: '🥗' },
];

export default function Home() {
  return (
    <main className="container stack">
      <section className="hero">
        <h1>Good food, just a few clicks away.</h1>
      </section>
      <section>
        <h2 className="section-title">What are you craving?</h2>
        <div className="category-row">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>
      <section>
        <div className="section-head">
          <h2 className="section-title">Popular restaurants</h2>
          <Link to="/restaurants">See all</Link>
        </div>
        <RestaurantGrid restaurants={restaurants} />
      </section>
    </main>
  );
}
