import { PRICE_RANGES } from '../utils/helpers';

/**
 * Presentational filter panel. All filter state lives in the
 * Restaurants page and is passed down as props.
 */
export default function FilterPanel({ filters, onChange, cuisines, onReset }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className="filter-panel" aria-label="Filters">
      <div className="filter-panel__head">
        <h2>Filters</h2>
        <button type="button" className="link-button" onClick={onReset}>Reset</button>
      </div>

      <fieldset className="filter-group">
        <legend>Cuisine</legend>
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${filters.cuisine === 'all' ? 'chip--active' : ''}`}
            aria-pressed={filters.cuisine === 'all'}
            onClick={() => update('cuisine', 'all')}
          >
            All
          </button>
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              className={`chip ${filters.cuisine === cuisine ? 'chip--active' : ''}`}
              aria-pressed={filters.cuisine === cuisine}
              onClick={() => update('cuisine', cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Minimum rating</legend>
        <div className="chip-row">
          {[0, 3.5, 4, 4.5].map((value) => (
            <button
              key={value}
              type="button"
              className={`chip ${filters.minRating === value ? 'chip--active' : ''}`}
              aria-pressed={filters.minRating === value}
              onClick={() => update('minRating', value)}
            >
              {value === 0 ? 'Any' : `${value}+`}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Price for two</legend>
        <div className="chip-row">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              type="button"
              className={`chip ${filters.priceRange === range.id ? 'chip--active' : ''}`}
              aria-pressed={filters.priceRange === range.id}
              onClick={() => update('priceRange', range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="filter-group">
        <label className="switch">
          <input
            type="checkbox"
            checked={filters.vegOnly}
            onChange={(event) => update('vegOnly', event.target.checked)}
          />
          <span>Pure vegetarian only</span>
        </label>
      </div>
    </aside>
  );
}
