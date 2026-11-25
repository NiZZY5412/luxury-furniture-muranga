import { useWishlist } from "../context/WishlistContext";
import ShopProductCard from "../components/ShopProductCard";
import "../styles/wishlist.css";

export default function Wishlist({ onAddToCart }) {
  const { items, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();
  return (
    <main className="wishlist-page"><section className="wishlist-container">
      <div className="wishlist-heading"><span>YOUR PERSONAL COLLECTION</span><h1>My <em>Wishlist</em></h1><p>Keep the furniture you love in one place.</p></div>
      {wishlistCount === 0 ? <div className="wishlist-empty"><div className="empty-icon">♡</div><h2>Your Wishlist Is Empty</h2><p>Explore our furniture collections and save your favourite pieces here.</p><a href="/shop" className="wishlist-explore-button">Discover Furniture &nbsp;→</a></div> : <>
        <div className="wishlist-toolbar"><span>{wishlistCount} saved item(s)</span><button type="button" onClick={clearWishlist}>× &nbsp; Clear Wishlist</button></div>
        <div className="wishlist-grid">{items.map((product) => <div className="wishlist-product-wrapper" key={product.id}><ShopProductCard product={product} onAddToCart={onAddToCart} /><button type="button" className="wishlist-remove-button" onClick={() => removeFromWishlist(product.id)}>× &nbsp; Remove from Wishlist</button></div>)}</div>
        <a href="/shop" className="wishlist-continue">♧ &nbsp; Continue Shopping</a>
      </>}
    </section></main>
  );
}
