import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const formatPrice = (value) => `KSh ${Number(value).toLocaleString("en-KE")}`;

export default function Cart() {
  const { items, cartCount, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return <main className="cart-page"><section className="cart-empty"><div className="empty-icon" aria-hidden="true">♧</div><h1>Your Shopping Bag Is Empty</h1><p>Explore our furniture collection and discover something exceptional for your space.</p><a href="/shop" className="cart-primary-button">Explore Furniture &nbsp;→</a></section></main>;
  }

  return (
    <main className="cart-page">
      <section className="cart-container">
        <div className="cart-heading"><span>YOUR SELECTION</span><h1>Shopping <em>Bag</em></h1><p>{cartCount} item(s) in your shopping bag</p></div>
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(({ product, quantity }) => {
              const image = product.images?.[0] || product.image;
              return <article className="cart-item" key={product.id}>
                <a href={`/product/${product.id}`} className="cart-item-image">{image ? <img src={image} alt={product.name} /> : <div className="cart-image-placeholder">No image</div>}</a>
                <div className="cart-item-info"><span>{product.category}</span><a href={`/product/${product.id}`}><h3>{product.name}</h3></a><strong className="cart-item-price">{formatPrice(product.price)}</strong><div className="cart-item-controls"><div className="cart-quantity"><button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} disabled={quantity <= 1} aria-label="Decrease quantity">−</button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity">+</button></div><button type="button" className="cart-remove" onClick={() => removeFromCart(product.id)}>× Remove</button></div></div>
                <strong className="cart-line-total">{formatPrice(Number(product.price) * quantity)}</strong>
              </article>;
            })}
            <a href="/shop" className="continue-shopping">← &nbsp; Continue Shopping</a>
          </div>
          <aside className="cart-summary"><h2>Order Summary</h2><div className="cart-summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="cart-summary-divider" /><div className="cart-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><p className="cart-summary-note">Delivery fees, taxes and discounts will be confirmed during checkout.</p><a href="/checkout" className="cart-checkout-button">Proceed to Checkout →</a><p className="cart-security-note">No payment will be taken in this frontend preview.</p></aside>
        </div>
      </section>
    </main>
  );
}
