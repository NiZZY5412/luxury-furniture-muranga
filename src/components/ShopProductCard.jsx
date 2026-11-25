import { useWishlist } from "../context/WishlistContext";

export default function ShopProductCard({ product, onAddToCart, onWishlist }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(product.id);
  const image = product.images?.[0] || product.image;
  const priceAvailable = product.price !== null && product.price !== undefined && product.price !== "";
  const price = Number(product.price);

  return (
    <article className="shop-product-card">
      <a href={`/product/${product.id}`} className="shop-product-image">
        {image ? <img src={image} alt={product.name} /> : <div className="product-image-placeholder">Product image unavailable</div>}
        {product.badge && <span className="shop-product-badge">{product.badge}</span>}
      </a>
      <button type="button" className={`shop-wishlist-button ${saved ? "saved" : ""}`} onClick={() => { toggleWishlist(product); onWishlist?.(product); }} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved}>♡</button>
      <div className="shop-product-details">
        <span className="shop-product-category">{product.category}</span>
        <a href={`/product/${product.id}`}><h3>{product.name}</h3></a>
        <p className="shop-product-description">{product.description}</p>
        <div className="shop-product-bottom">
          <strong>{priceAvailable && Number.isFinite(price) ? `KSh ${price.toLocaleString("en-KE")}` : "Contact for Price"}</strong>
          <button type="button" className="shop-add-button" disabled={product.price == null || product.price === "" || !Number.isFinite(Number(product.price)) || Number(product.price) < 0 || product.available !== true} onClick={() => onAddToCart?.(product)}>♧ <span>{product.available === false ? "Unavailable" : product.available === true && Number.isFinite(Number(product.price)) ? "Add to Bag" : "Enquire"}</span></button>
        </div>
      </div>
    </article>
  );
}
