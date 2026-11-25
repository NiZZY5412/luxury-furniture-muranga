import { useMemo, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ShopProductCard from "../components/ShopProductCard";
import { products, productCategories } from "../data/products";
import "../styles/shop.css";

export default function Shop({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Furniture");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => product.published !== false);
    if (category !== "All Furniture") result = result.filter((product) => product.category?.toLowerCase() === category.toLowerCase());
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((product) => [product.name, product.category, product.description].filter(Boolean).some((value) => value.toLowerCase().includes(query)));
    }
    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc") result.sort((a, b) => (a.price == null ? 1 : b.price == null ? -1 : Number(a.price) - Number(b.price)));
    if (sort === "price-desc") result.sort((a, b) => (a.price == null ? 1 : b.price == null ? -1 : Number(b.price) - Number(a.price)));
    return result;
  }, [search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All Furniture");
    setSort("featured");
  };

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <span>DISCOVER EXCEPTIONAL LIVING</span>
        <h1>The Furniture <em>Collection</em></h1>
        <p>Explore furniture designed to bring comfort, elegance and character into your space.</p>
      </section>
      <section className="shop-content">
        <div className="shop-heading">
          <div><span className="shop-eyebrow">OUR COLLECTIONS</span><h2>Explore Our Furniture</h2></div>
          <span className="product-count">{filteredProducts.length} products</span>
        </div>
        <ProductFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} categories={productCategories} />
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">{filteredProducts.map((product) => <ShopProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}</div>
        ) : (
          <div className="shop-empty-state">
            <div className="empty-icon" aria-hidden="true">⌂</div>
            <h3>{products.length === 0 ? "Our collection is being prepared" : "No matching furniture found"}</h3>
            <p>{products.length === 0 ? "Our furniture collection will appear here once products are added to the catalogue." : "Try another search or choose a different category."}</p>
            <button type="button" onClick={resetFilters}>↻ &nbsp; Reset Filters</button>
          </div>
        )}
      </section>
    </main>
  );
}
