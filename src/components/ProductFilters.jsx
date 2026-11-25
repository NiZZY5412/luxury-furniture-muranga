const FilterIcon = ({ children }) => <span aria-hidden="true">{children}</span>;

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="shop-filters">
      <label className="shop-search">
        <FilterIcon>⌕</FilterIcon>
        <input
          type="search"
          placeholder="Search furniture..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="category-filters">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={category === item ? "category-filter active" : "category-filter"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="shop-sort">
        <FilterIcon>☷</FilterIcon>
        <label htmlFor="product-sort">Sort by:</label>
        <select id="product-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
