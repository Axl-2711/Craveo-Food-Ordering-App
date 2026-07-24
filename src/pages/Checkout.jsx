import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import EmptyState from '../components/EmptyState';
import { deliveryWindow, generateOrderId } from '../utils/helpers';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  payment: 'cod',
};

/** Pure validation function — returns an object of field -> message. */
function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (form.address.trim().length < 10) errors.address = 'Address should be at least 10 characters.';
  if (!form.city.trim()) errors.city = 'Please enter your city.';
  if (!/^\d{6}$/.test(form.pincode.trim())) errors.pincode = 'Pincode must be 6 digits.';
  return errors;
}

export default function Checkout() {
  const { items, subtotal, deliveryFee, taxes, total, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="container stack">
        <EmptyState
          icon="🧾"
          title="Nothing to check out"
          message="Your cart is empty, so there is no order to place yet."
          action={<Link className="btn btn--primary" to="/restaurants">Browse Restaurants</Link>}
        />
      </main>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = {
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      eta: deliveryWindow(35),
      items,
      bill: { subtotal, deliveryFee, taxes, total },
      address: { ...form },
    };

    try {
      localStorage.setItem('craveo_last_order', JSON.stringify(order));
    } catch (error) {
      console.warn('Could not save the order locally.', error);
    }

    clearCart();
    navigate('/order-success', { state: { order } });
  }

  return (
    <main className="container stack">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="muted">Mock checkout — no real payment is processed.</p>
      </header>

      <div className="cart-layout">
        <form className="card form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery address</h2>

          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName" name="fullName" type="text" value={form.fullName}
              onChange={handleChange} aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && <p className="field__error" id="fullName-error">{errors.fullName}</p>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone" name="phone" type="tel" inputMode="numeric" value={form.phone}
              onChange={handleChange} aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && <p className="field__error" id="phone-error">{errors.phone}</p>}
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address" name="address" rows="3" value={form.address}
              onChange={handleChange} aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && <p className="field__error" id="address-error">{errors.address}</p>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city" name="city" type="text" value={form.city}
                onChange={handleChange} aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && <p className="field__error" id="city-error">{errors.city}</p>}
            </div>

            <div className="field">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode" name="pincode" type="text" inputMode="numeric" value={form.pincode}
                onChange={handleChange} aria-invalid={Boolean(errors.pincode)}
                aria-describedby={errors.pincode ? 'pincode-error' : undefined}
              />
              {errors.pincode && <p className="field__error" id="pincode-error">{errors.pincode}</p>}
            </div>
          </div>

          <fieldset className="field">
            <legend>Payment method</legend>
            {[
              { id: 'cod', label: 'Cash on Delivery' },
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'Credit / Debit Card' },
            ].map((option) => (
              <label className="radio" key={option.id}>
                <input
                  type="radio" name="payment" value={option.id}
                  checked={form.payment === option.id} onChange={handleChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>

          <button type="submit" className="btn btn--primary btn--block">Place order</button>
        </form>

        <CartSummary />
      </div>
    </main>
  );
}
