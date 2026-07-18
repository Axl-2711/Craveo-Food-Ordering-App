import Thumb from './Thumb';
import { formatCurrency } from '../utils/helpers';

// Cart wiring (add/remove/quantity) comes in the next stage once
// CartContext exists — for now this just renders the dish and a static button.
export default function MenuItem({ item }) {
  return (
    <li className="menu-item">
      <div className="menu-item__info">
        <p className="menu-item__tags">
          <span className={`veg-mark ${item.isVeg ? 'veg-mark--veg' : 'veg-mark--nonveg'}`}>
            <span className="sr-only">{item.isVeg ? 'Vegetarian' : 'Non vegetarian'}</span>
          </span>
          {item.isRecommended && <span className="badge badge--soft">Recommended</span>}
        </p>
        <h3>{item.name}</h3>
        <p className="menu-item__price">{formatCurrency(item.price)}</p>
        <p className="muted">{item.description}</p>
      </div>
      <div className="menu-item__action">
        <Thumb emoji={item.image} label={item.name} variant="menu" seed={item.name.length} />
        <button type="button" className="btn btn--outline btn--sm">Add</button>
      </div>
    </li>
  );
}
