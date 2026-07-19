import { formatCurrency } from '../utils/helpers';
import { FREE_DELIVERY_ABOVE, useCart } from '../context/CartContext';

export default function CartSummary({ children }) {
  const { subtotal, deliveryFee, taxes, total, itemCount } = useCart();

  return (
    <section className="card summary" aria-label="Order summary">
      <h2>Bill details</h2>
      <dl>
        <div>
          <dt>Item total ({itemCount} {itemCount === 1 ? 'item' : 'items'})</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery fee</dt>
          <dd>{deliveryFee === 0 ? <span className="free">FREE</span> : formatCurrency(deliveryFee)}</dd>
        </div>
        <div>
          <dt>Taxes &amp; charges (5%)</dt>
          <dd>{formatCurrency(taxes)}</dd>
        </div>
        <div className="summary__total">
          <dt>To pay</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
      {deliveryFee > 0 && (
        <p className="summary__hint">
          Add {formatCurrency(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery.
        </p>
      )}
      {children}
    </section>
  );
}
