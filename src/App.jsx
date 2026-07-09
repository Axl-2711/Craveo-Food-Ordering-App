import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RestaurantGrid from './components/RestaurantGrid';
import CategoryCard from './components/CategoryCard';

// Temporary sample data for building components in isolation.
// Will be replaced by a real data source once the API layer is wired up.
const sampleRestaurants = [
  { id: 1, name: 'Tandoor Tales', image: '🍛', rating: 4.5, cuisine: ['Indian'], deliveryTime: 32, priceForTwo: 550, location: 'Baner, Pune', isVeg: false, offers: ['50% OFF up to ₹100'] },
  { id: 2, name: 'Pizza District', image: '🍕', rating: 4.3, cuisine: ['Pizza'], deliveryTime: 25, priceForTwo: 600, location: 'Koregaon Park, Pune', isVeg: false, offers: [] },
  { id: 3, name: 'The Green Bowl', image: '🥗', rating: 4.6, cuisine: ['Healthy'], deliveryTime: 22, priceForTwo: 450, location: 'Aundh, Pune', isVeg: true, offers: ['Flat ₹75 OFF'] },
];

const sampleCategories = [
  { id: 'pizza', label: 'Pizza', image: '🍕' },
  { id: 'indian', label: 'Indian', image: '🍛' },
  { id: 'healthy', label: 'Healthy', image: '🥗' },
];

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container stack">
        <section>
          <h2 className="section-title">Categories</h2>
          <div className="category-row">
            {sampleCategories.map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>
        <section>
          <h2 className="section-title">Restaurants (component demo)</h2>
          <RestaurantGrid restaurants={sampleRestaurants} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
