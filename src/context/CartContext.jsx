import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const DELIVERY_FEE = 39;
export const FREE_DELIVERY_ABOVE = 499;
export const TAX_RATE = 0.05;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

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
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  }

  function decreaseQuantity(id) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const taxes = Math.round(subtotal * TAX_RATE);
    return { itemCount, subtotal, deliveryFee, taxes, total: subtotal + deliveryFee + taxes };
  }, [items]);

  const value = { items, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, ...totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}
