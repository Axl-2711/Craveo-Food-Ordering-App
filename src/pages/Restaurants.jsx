import { useEffect, useState } from 'react';
import { getRestaurants } from '../services/restaurantService';
import RestaurantGrid from '../components/RestaurantGrid';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let ignore = false;
    async function load() {
      setStatus('loading');
      try {
        const data = await getRestaurants();
        if (ignore) return;
        setRestaurants(data);
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
      <header className="page-head">
        <h1>Restaurants</h1>
        <p className="muted">{status === 'success' ? `${restaurants.length} restaurants` : 'Loading...'}</p>
      </header>
      {status === 'loading' && <Loading count={6} />}
      {status === 'error' && <ErrorState onRetry={() => window.location.reload()} />}
      {status === 'success' && <RestaurantGrid restaurants={restaurants} />}
    </main>
  );
}
