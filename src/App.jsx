
import { useState } from "react";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import AboutPage from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { CartProvider, useCart } from "./context/CartContext";
import { WishlistProvider, useWishlist } from "./context/WishlistContext";

const makeIcon = (symbol) => function Icon({ size = 24 }) {
  return (
    <span
      aria-hidden="true"
      style={{ fontSize: `${Math.max(14, size - 2)}px`, lineHeight: 1 }}
    >
      {symbol}
    </span>
  );
};

const Menu = makeIcon("☰");
const X = makeIcon("×");
const ShoppingBag = makeIcon("♧");
const Search = makeIcon("⌕");
const ArrowUpRight = makeIcon("↗");
const ArrowRight = makeIcon("→");
const Heart = makeIcon("♡");

const categories = [
  {
    name: "Living Room",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
  },
  {
    name: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900",
  },
  {
    name: "Dining",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
  },
  {
    name: "Office",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
  },
];

function Navbar({ cartCount, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#home" className="brand">
        <span className="brand-mark">LF</span>
        <span className="brand-text">
          LUXURY FURNITURE
          <small>MURANG'A</small>
        </span>
      </a>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/shop#collections" onClick={() => setMenuOpen(false)}>Collections</a>
        <a href="/shop" onClick={() => setMenuOpen(false)}>Shop</a>
        <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
        <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>

      <div className="nav-actions">
        <button className="icon-button" aria-label="Search">
          <Search size={19} />
        </button>

        <a href="/wishlist" className="wishlist-nav-button" aria-label="My wishlist"><Heart size={20} /><span className="wishlist-nav-count">{wishlistCount}</span></a>
        <a href="/cart" className="cart-button" aria-label="Shopping bag">
          <ShoppingBag size={20} />
          <span className="cart-count">{cartCount}</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">
          <span className="gold-line" />
          THE ART OF LUXURY LIVING
        </span>

        <h1>
          Elevate Your
          <br />
          Living <em>Space.</em>
        </h1>

        <p>
          Discover exceptional furniture that transforms
          ordinary spaces into extraordinary experiences.
          Elegance, comfort and craftsmanship in every detail.
        </p>

        <div className="hero-buttons">
          <a href="#shop" className="btn-gold">
            Explore Collection <ArrowUpRight size={18} />
          </a>

          <a href="#about" className="btn-outline">
            Discover Our Story
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>01.</strong>
            <span>Timeless Design</span>
          </div>
          <div>
            <strong>02.</strong>
            <span>Exceptional Comfort</span>
          </div>
          <div>
            <strong>03.</strong>
            <span>Premium Style</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400"
          alt="Elegant luxury living room"
        />

        <div className="hero-image-label">
          <span>THE SIGNATURE COLLECTION</span>
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="hero-watermark">LUXURY</div>
    </section>
  );
}

function Categories() {
  return (
    <section className="categories section" id="collections">
      <div className="section-heading">
        <div>
          <span className="eyebrow dark-eyebrow">CURATED FOR YOUR HOME</span>
          <h2>Explore Our <em>Collections</em></h2>
        </div>

        <a href="#shop" className="text-link">
          View All Collections <ArrowRight size={17} />
        </a>
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <a href="#shop" className="category-card" key={category.name}>
            <img src={category.image} alt={category.name} />

            <div className="category-overlay">
              <span>0{index + 1}</span>
              <h3>{category.name}</h3>
              <ArrowUpRight size={23} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="featured section" id="shop">
      <div className="section-heading">
        <div>
          <span className="eyebrow dark-eyebrow">HANDPICKED FOR YOU</span>
          <h2>Featured <em>Furniture</em></h2>
          <p className="section-description">
            Discover pieces that bring beauty, comfort and
            character into your home.
          </p>
        </div>

        <a href="#contact" className="text-link">
          Explore More <ArrowRight size={17} />
        </a>
      </div>

      <div className="shop-empty-state">
        <div className="empty-icon" aria-hidden="true">⌂</div>
        <h3>Our collection is being prepared</h3>
        <p>Our furniture collection will appear here once products are added to the catalogue.</p>
        <a href="/shop" className="btn-gold">Visit the Shop <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
          alt="Sophisticated contemporary interior"
        />
      </div>

      <div className="about-content">
        <span className="eyebrow">OUR PHILOSOPHY</span>
        <h2>
          Beautiful Spaces.
          <br />
          <em>Exceptional Living.</em>
        </h2>

        <p>
          We believe furniture is more than what fills a room.
          It expresses personality, creates comfort and brings
          your vision of home to life.
        </p>

        <a href="#contact" className="btn-gold">
          Discover More <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div>
          <a href="/" className="brand footer-brand">
            <span className="brand-mark">LF</span>
            <span className="brand-text">
              LUXURY FURNITURE
              <small>MURANG'A</small>
            </span>
          </a>
          <p>
            Bringing elegance, comfort and timeless style
            into your living spaces.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <a href="/">Home</a>
          <a href="/shop">Shop Furniture</a>
          <a href="/wishlist">My Wishlist</a>
          <a href="/about">About Us</a>
        </div>

        <div className="footer-column">
          <h4>Customer Care</h4>
          <a href="/contact">Contact Us</a>
          <a href="/faq">Frequently Asked Questions</a>
          <a href="/cart">Shopping Bag</a>
          <a href="/checkout">Checkout</a>
        </div>

        <div className="footer-column">
          <h4>Policies & Information</h4>
          <a href="/shipping">Shipping & Delivery</a>
          <a href="/returns">Returns & Refunds</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="/contact" aria-label="Instagram">◎</a>
            <a href="/contact" aria-label="Facebook">f</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 LUXURY FURNITURE MURANG'A.</span>
        <span>Designed for exceptional living.</span>
      </div>
    </footer>
  );
}

function AppContent() {
  const { cartCount, addToCart } = useCart();
  const { wishlistCount } = useWishlist();
  const handleAddToCart = (product, quantity = 1) => {
    const result = addToCart(product, quantity);
    alert(result.message);
  };

  const isShopPage = window.location.pathname === "/shop";
  const isProductPage = window.location.pathname.startsWith("/product/");
  const isCartPage = window.location.pathname === "/cart";
  const isCheckoutPage = window.location.pathname === "/checkout";
  const isWishlistPage = window.location.pathname === "/wishlist";
  const isAboutPage = window.location.pathname === "/about";
  const isContactPage = window.location.pathname === "/contact";
  const isFaqPage = window.location.pathname === "/faq";
  const isShippingPage = window.location.pathname === "/shipping";
  const isReturnsPage = window.location.pathname === "/returns";
  const isPrivacyPage = window.location.pathname === "/privacy";
  const isTermsPage = window.location.pathname === "/terms";

  return (
    <>
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      {isShopPage ? <Shop onAddToCart={handleAddToCart} /> : isProductPage ? <ProductDetails onAddToCart={handleAddToCart} /> : isCartPage ? <Cart /> : isCheckoutPage ? <Checkout /> : isWishlistPage ? <Wishlist onAddToCart={handleAddToCart} /> : isAboutPage ? <AboutPage /> : isContactPage ? <Contact /> : isFaqPage ? <FAQ /> : isShippingPage ? <Shipping /> : isReturnsPage ? <Returns /> : isPrivacyPage ? <Privacy /> : isTermsPage ? <Terms /> : <main><Hero /><Categories /><FeaturedProducts onAdd={handleAddToCart} /><About /></main>}
      <Footer />
    </>
  );
}

export default function App() {
  return <CartProvider><WishlistProvider><AppContent /></WishlistProvider></CartProvider>;
}
