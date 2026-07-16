export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-by">Sort by</label>
      <select id="sort-by" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="rating">Rating: High to Low</option>
        <option value="delivery">Delivery Time: Fastest</option>
        <option value="price">Price: Low to High</option>
      </select>
    </div>
  );
}
