import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/helpers';

export default function OrderSuccess() {
  const location = useLocation();
  // The order arrives via router state; localStorage is the refresh fallback.
  const [order, setOrder] = useState(location.state?.order ?? null);

  useEffect(() => {
    if (order) return;
    try {
      const raw = localStorage.getItem('craveo_last_order');
      if (raw) setOrder(JSON.parse(raw));
    } catch (error) {
      console.warn('Could not read the last order.', error);
    }
  }, [order]);

  if (!order) {
    return (
      <main className="container stack">
        <EmptyState
          icon="📦"
          title="No recent order found"
          message="Place an order and your confirmation will appear here."
          action={<Link className="btn btn--primary" to="/restaurants">Browse Restaurants</Link>}
        />
      </main>
    );
  }

  const { address, bill, items } = order;

  return (
    <main className="container stack">
      <section className="card success">
        <span className="success__icon" aria-hidden="true">✅</span>
        <h1>Order placed successfully!</h1>
        <p className="muted">Thanks {address.fullName.split(' ')[0]} — your food is being prepared.</p>
        <dl className="success__meta">
          <div>
            <dt>Order ID</dt>
            <dd>{order.id}</dd>
          </div>
          <div>
            <dt>Estimated delivery</dt>
            <dd>{order.eta}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{address.payment === 'cod' ? 'Cash on Delivery' : address.payment.toUpperCase()}</dd>
          </div>
        </dl>
      </section>

      <div className="cart-layout">
        <section className="card">
          <h2>Items ordered</h2>
          <ul className="order-items">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  <span aria-hidden="true">{item.image}</span> {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="order-total">
            <span>Total paid</span>
            <strong>{formatCurrency(bill.total)}</strong>
          </p>
        </section>

        <section className="card">
          <h2>Delivering to</h2>
          <address className="address">
            {address.fullName}<br />
            {address.address}<br />
            {address.city} — {address.pincode}<br />
            📞 {address.phone}
          </address>
          <Link to="/restaurants" className="btn btn--primary btn--block">Continue Shopping</Link>
        </section>
      </div>
    </main>
  );
}
