import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "luxury-furniture-cart";

function getSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hasValidPrice(product) {
  return product?.price !== null && product?.price !== undefined && product.price !== "" && Number.isFinite(Number(product.price)) && Number(product.price) >= 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    if (!product?.id || !hasValidPrice(product)) return { success: false, message: "This product requires price confirmation." };
    if (product.available !== true) return { success: false, message: "This product is not currently available for purchase." };
    const amount = Math.max(1, Math.floor(Number(quantity) || 1));
    setItems((currentItems) => {
      const existing = currentItems.find((item) => String(item.product.id) === String(product.id));
      if (existing) return currentItems.map((item) => String(item.product.id) === String(product.id) ? { ...item, quantity: item.quantity + amount } : item);
      return [...currentItems, { product, quantity: amount }];
    });
    return { success: true, message: "Product added to your shopping bag." };
  };

  const updateQuantity = (productId, quantity) => {
    const amount = Math.floor(Number(quantity));
    if (!Number.isFinite(amount) || amount < 1) return;
    setItems((currentItems) => currentItems.map((item) => String(item.product.id) === String(productId) ? { ...item, quantity: amount } : item));
  };

  const removeFromCart = (productId) => setItems((currentItems) => currentItems.filter((item) => String(item.product.id) !== String(productId)));
  const clearCart = () => setItems([]);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);

  const value = { items, cartCount, subtotal, addToCart, updateQuantity, removeFromCart, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
