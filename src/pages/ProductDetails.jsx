import { useState } from "react";
import ShopProductCard from "../components/ShopProductCard";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import "../styles/product.css";

export default function ProductDetails({ onAddToCart }) {
  const id = window.location.pathname.split("/").filter(Boolean).pop();
  const product = products.find((item) => String(item.id) === String(id) && item.published !== false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="empty-icon" aria-hidden="true">⌂</div>
        <h1>Product not found</h1>
        <p>This product may no longer be available or may not have been added to our catalogue yet.</p>
        <a href="/shop" className="product-back-button">← &nbsp; Return to Shop</a>
      </main>
    );
  }

  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const price = Number(product.price);
  const priceAvailable = product.price !== null && product.price !== undefined && product.price !== "" && Number.isFinite(price);
  const isAvailable = product.available === true;
  const relatedProducts = products.filter((item) => String(item.id) !== String(product.id) && item.published !== false && item.category === product.category).slice(0, 4);

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <a href="/">Home</a><span>›</span><a href="/shop">Shop</a><span>›</span><span>{product.name}</span>
      </div>

      <section className="product-details-layout">
        <div className="product-gallery">
          <div className="product-main-image">
            {images.length ? <img src={images[activeImage]} alt={product.name} /> : <div className="product-detail-placeholder">Product image unavailable</div>}
          </div>
          {images.length > 1 && <div className="product-thumbnails">{images.map((image, index) => <button type="button" key={image} className={activeImage === index ? "product-thumbnail active" : "product-thumbnail"} onClick={() => setActiveImage(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div>}
        </div>

        <div className="product-information">
          {product.category && <span className="product-detail-category">{product.category}</span>}
          <h1>{product.name}</h1>
          {product.description && <p className="product-detail-description">{product.description}</p>}
          <div className="product-detail-divider" />
          <div className="product-detail-price"><strong>{priceAvailable ? `KSh ${price.toLocaleString("en-KE")}` : "Contact for Price"}</strong></div>
          {product.available === true && <p className="availability available">Available</p>}
          {product.available === false && <p className="availability unavailable">Currently unavailable</p>}

          {(product.dimensions || product.material) && <div className="product-specifications"><h3>Product Specifications</h3>{product.dimensions && <div className="specification-row"><span>Dimensions</span><strong>{product.dimensions}</strong></div>}{product.material && <div className="specification-row"><span>Material</span><strong>{product.material}</strong></div>}</div>}

          {priceAvailable && isAvailable && <div className="product-quantity"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div></div>}
          {priceAvailable && isAvailable ? <button type="button" className="product-add-cart" onClick={() => onAddToCart?.(product, quantity)}>♧ &nbsp; Add to Shopping Bag</button> : <button type="button" className="product-add-cart" disabled>{product.available === false ? "Currently Unavailable" : "Price Confirmation Required"}</button>}
          <button type="button" className="product-wishlist-button" onClick={() => toggleWishlist(product)} aria-pressed={saved}>♡ &nbsp; {saved ? "Saved to Wishlist" : "Add to Wishlist"}</button>
          <p className="product-detail-note">Product information and purchasing availability are subject to confirmation.</p>
        </div>
      </section>

      {product.description && <section className="product-description-section"><span>ABOUT THIS PRODUCT</span><h2>Product Description</h2><p>{product.description}</p></section>}
      {relatedProducts.length > 0 && <section className="related-products"><div className="related-heading"><span>YOU MAY ALSO LIKE</span><h2>Related <em>Furniture</em></h2></div><div className="shop-product-grid">{relatedProducts.map((item) => <ShopProductCard key={item.id} product={item} onAddToCart={onAddToCart} />)}</div></section>}
    </main>
  );
}
