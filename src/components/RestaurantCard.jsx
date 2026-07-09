import { Link } from 'react-router-dom';
import Thumb from './Thumb';
import { formatCurrency } from '../utils/helpers';

export default function RestaurantCard({ restaurant }) {
  const { id, name, image, rating, cuisine, deliveryTime, priceForTwo, location, offers, isVeg } =
    restaurant;

  return (
    <Link to={`/restaurant/${id}`} className="card restaurant-card">
      <div className="restaurant-card__media">
        <Thumb emoji={image} label={name} seed={id} />
        {offers.length > 0 && <span className="badge badge--offer">{offers[0]}</span>}
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__title">
          <h3>{name}</h3>
          <span className={`rating ${rating >= 4 ? 'rating--good' : 'rating--ok'}`}>
            ★ {rating.toFixed(1)}
          </span>
        </div>

        <p className="muted">{cuisine.join(', ')}</p>

        <p className="restaurant-card__meta">
          <span>{deliveryTime} min</span>
          <span aria-hidden="true">•</span>
          <span>{formatCurrency(priceForTwo)} for two</span>
        </p>

        <p className="restaurant-card__footer">
          <span className="muted">{location}</span>
          {isVeg && <span className="badge badge--veg">Pure Veg</span>}
        </p>
      </div>
    </Link>
  );
}
