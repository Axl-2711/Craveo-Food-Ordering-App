import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRestaurantById } from '../services/restaurantService';
import Thumb from '../components/Thumb';
import MenuItem from '../components/MenuItem';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { formatCurrency } from '../utils/helpers';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [status, setStatus] = useState('loading');
  const [activeCategory, setActiveCategory] = useState('Recommended');

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus('loading');
      try {
        const data = await getRestaurantById(id);
        if (ignore) return;
        setRestaurant(data);
        setActiveCategory('Recommended');
        setStatus('success');
      } catch (error) {
        if (!ignore) setStatus('notFound');
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const categories = useMemo(() => {
    if (!restaurant) return [];
    const unique = [...new Set(restaurant.menu.map((item) => item.category))];
    return ['Recommended', ...unique];
  }, [restaurant]);

  const visibleItems = useMemo(() => {
    if (!restaurant) return [];
    if (activeCategory === 'Recommended') {
      return restaurant.menu.filter((item) => item.isRecommended);
    }
    return restaurant.menu.filter((item) => item.category === activeCategory);
  }, [restaurant, activeCategory]);

  if (status === 'loading') {
    return (
      <main className="container stack">
        <Loading message="Loading the menu..." count={4} />
      </main>
    );
  }

  if (status === 'notFound') {
    return (
      <main className="container stack">
        <ErrorState message="We couldn’t find that restaurant." />
        <p className="center">
          <Link className="btn btn--primary" to="/restaurants">Browse restaurants</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container stack">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> <span aria-hidden="true">/</span>{' '}
        <Link to="/restaurants">Restaurants</Link> <span aria-hidden="true">/</span>{' '}
        <span aria-current="page">{restaurant.name}</span>
      </nav>

      <section className="restaurant-hero card">
        <Thumb emoji={restaurant.image} label={restaurant.name} variant="cover" seed={restaurant.id} />
        <div className="restaurant-hero__info">
          <h1>{restaurant.name}</h1>
          <p className="muted">{restaurant.cuisine.join(', ')} · {restaurant.location}</p>
          <p className="restaurant-hero__meta">
            <span className="rating rating--good">★ {restaurant.rating.toFixed(1)}</span>
            <span>{restaurant.deliveryTime} min delivery</span>
            <span>{formatCurrency(restaurant.priceForTwo)} for two</span>
            {restaurant.isVeg && <span className="badge badge--veg">Pure Veg</span>}
          </p>
          <p>{restaurant.description}</p>
          {restaurant.offers.length > 0 && (
            <ul className="offer-list">
              {restaurant.offers.map((offer) => (
                <li key={offer} className="badge badge--offer">{offer}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <h2 className="section-title">Menu</h2>
        <div className="chip-row chip-row--scroll" role="tablist" aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`chip ${activeCategory === category ? 'chip--active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="menu-list">
          {visibleItems.map((item) => (
            <MenuItem key={item.id} item={item} restaurant={restaurant} />
          ))}
        </ul>
      </section>

        <div className="cart-cta">
          <Link to="/cart" className="btn btn--primary">View cart</Link>
        </div>
      </main>
    );
  }

