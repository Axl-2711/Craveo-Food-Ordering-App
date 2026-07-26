import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, getRestaurants } from '../services/restaurantService';
import RestaurantGrid from '../components/RestaurantGrid';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { sortRestaurants } from '../utils/helpers';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus('loading');
      try {
        const [restaurantData, categoryData] = await Promise.all([
          getRestaurants(),
          getCategories(),
        ]);
        if (ignore) return;
        setRestaurants(restaurantData);
        setCategories(categoryData);
        setStatus('success');
      } catch (error) {
        if (!ignore) setStatus('error');
      }
    }

    load();
    // Guards against setting state after the component unmounts.
    return () => {
      ignore = true;
    };
  }, []);

  const popular = sortRestaurants(restaurants, 'rating').slice(0, 4);
  const recommended = sortRestaurants(restaurants, 'delivery').slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Delivering across Pune</p>
          <h1>Good food, just a few clicks away.</h1>
          <p className="hero__sub">
            Search 14 kitchens, 150+ dishes and get it at your door — biryani, sourdough pizza,
            smash burgers or a quinoa bowl.
          </p>
          <div className="hero__search">
            <SearchBar
              onSubmit={(query) => navigate(`/restaurants?q=${encodeURIComponent(query)}`)}
              placeholder="Try “biryani”, “pizza” or “healthy”"
            />
          </div>
          <p className="hero__stats">
            <span>⭐ 4.3 average rating</span>
            <span>🛵 20 min average delivery</span>
            <span>💸 Free delivery above ₹499</span>
          </p>
        </div>
      </section>

      <main className="container stack">
        {status === 'loading' && <Loading />}
        {status === 'error' && <ErrorState onRetry={() => window.location.reload()} />}

        {status === 'success' && (
          <>
            <section>
              <h2 className="section-title">What are you craving?</h2>
              <div className="category-row">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>

            <section>
              <div className="section-head">
                <h2 className="section-title">Popular right now</h2>
                <Link className="link-button" to="/restaurants">See all</Link>
              </div>
              <RestaurantGrid restaurants={popular} />
            </section>

            <section className="promo">
              <div>
                <h2>Craveo Saver Pack</h2>
                <p>Flat 20% off on your first three orders plus free delivery above ₹499.</p>
              </div>
              <Link to="/restaurants" className="btn btn--light">Order now</Link>
            </section>

            <section>
              <div className="section-head">
                <h2 className="section-title">Fastest delivery near you</h2>
                <Link className="link-button" to="/restaurants">See all</Link>
              </div>
              <RestaurantGrid restaurants={recommended} />
            </section>
          </>
        )}
      </main>
    </>
  );
}
