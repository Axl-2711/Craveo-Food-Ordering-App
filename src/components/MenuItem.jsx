import Thumb from './Thumb';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item, restaurant }) {
  const { addToCart, items, increaseQuantity, decreaseQuantity } = useCart();
  const inCart = items.find((cartItem) => cartItem.id === item.id);

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
        {inCart ? (
          <div className="stepper" role="group" aria-label={`Quantity of ${item.name}`}>
            <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Remove one ${item.name}`}>−</button>
            <span>{inCart.quantity}</span>
            <button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Add one ${item.name}`}>+</button>
          </div>
        ) : (
          <button type="button" className="btn btn--outline btn--sm" onClick={() => addToCart(item, restaurant)}>
            Add
          </button>
        )}
      </div>
    </li>
  );
}
