import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getRestaurants } from '../services/restaurantService';
import RestaurantGrid from '../components/RestaurantGrid';
import CategoryCard from '../components/CategoryCard';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let ignore = false;
    async function load() {
      setStatus('loading');
      try {
        const [r, c] = await Promise.all([getRestaurants(), getCategories()]);
        if (ignore) return;
        setRestaurants(r);
        setCategories(c);
        setStatus('success');
      } catch (e) {
        if (!ignore) setStatus('error');
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  return (
    <main className="container stack">
      <section className="hero">
        <h1>Good food, just a few clicks away.</h1>
      </section>

      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorState onRetry={() => window.location.reload()} />}
      {status === 'success' && (
        <>
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
        </>
      )}
    </main>
  );
}
