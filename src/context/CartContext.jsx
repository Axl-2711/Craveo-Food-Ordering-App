import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'craveo_cart';
export const DELIVERY_FEE = 39;
export const FREE_DELIVERY_ABOVE = 499;
export const TAX_RATE = 0.05;

/** Reads the cart from localStorage, ignoring missing or corrupt data. */
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only entries that still have the shape we expect.
    return parsed.filter(
      (item) => item && item.id && typeof item.price === 'number' && typeof item.quantity === 'number'
    );
  } catch (error) {
    console.warn('Could not read saved cart, starting empty.', error);
    return [];
  }
}

export function CartProvider({ children }) {
  // Lazy initialiser: localStorage is read once, on first render.
  const [items, setItems] = useState(loadCart);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Could not save cart.', error);
    }
  }, [items]);

  function addToCart(menuItem, restaurant) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          isVeg: menuItem.isVeg,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function increaseQuantity(id) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function decreaseQuantity(id) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  /** Bill values are derived from `items`, never stored in separate state. */
  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const taxes = Math.round(subtotal * TAX_RATE);
    return { itemCount, subtotal, deliveryFee, taxes, total: subtotal + deliveryFee + taxes };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Small wrapper so components don't need to import the context object. */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
