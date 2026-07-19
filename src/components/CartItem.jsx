import Thumb from './Thumb';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <li className="cart-item">
      <Thumb emoji={item.image} label={item.name} variant="menu" seed={item.name.length} />

      <div className="cart-item__info">
        <h3>{item.name}</h3>
        <p className="muted">{item.restaurantName}</p>
        <p className="cart-item__price">{formatCurrency(item.price)}</p>
      </div>

      <div className="cart-item__controls">
        <div className="stepper" role="group" aria-label={`Quantity of ${item.name}`}>
          <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name}`}>−</button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Increase ${item.name}`}>+</button>
        </div>
        <p className="cart-item__total">{formatCurrency(item.price * item.quantity)}</p>
        <button type="button" className="link-button" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}
