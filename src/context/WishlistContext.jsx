import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "luxury-furniture-wishlist";

function getSavedWishlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(getSavedWishlist);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items]);
  const isWishlisted = (productId) => items.some((item) => String(item.id) === String(productId));
  const toggleWishlist = (product) => {
    if (!product?.id) return false;
    const exists = isWishlisted(product.id);
    setItems((current) => exists ? current.filter((item) => String(item.id) !== String(product.id)) : [...current, product]);
    return !exists;
  };
  const removeFromWishlist = (productId) => setItems((current) => current.filter((item) => String(item.id) !== String(productId)));
  const clearWishlist = () => setItems([]);
  const value = { items, wishlistCount: items.length, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
