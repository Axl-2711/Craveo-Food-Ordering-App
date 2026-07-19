import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyState from '../components/EmptyState';

export default function Cart() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="container stack">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Add a few dishes and they'll show up here — even after a refresh."
          action={<Link className="btn btn--primary" to="/restaurants">Browse Restaurants</Link>}
        />
      </main>
    );
  }

  return (
    <main className="container stack">
      <header className="page-head">
        <h1>Your cart</h1>
        <button type="button" className="link-button" onClick={clearCart}>Clear cart</button>
      </header>

      <div className="cart-layout">
        <ul className="cart-list card">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <CartSummary>
          <Link to="/checkout" className="btn btn--primary btn--block">Proceed to Checkout</Link>
          <Link to="/restaurants" className="link-button block-link">Add more items</Link>
        </CartSummary>
      </div>
    </main>
  );
}
