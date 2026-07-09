import { useState } from 'react';

/**
 * Controlled search input.
 * `onChange` is used for live (debounced) search on the listing page,
 * `onSubmit` is used by the navbar to navigate to the listing page.
 */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search',
  autoFocus = false,
}) {
  const isControlled = typeof onChange === 'function';
  const [internalValue, setInternalValue] = useState('');
  const currentValue = isControlled ? value : internalValue;

  function handleChange(event) {
    if (isControlled) onChange(event.target.value);
    else setInternalValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit) onSubmit(currentValue);
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="craveo-search">Search for food or restaurants</label>
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        id="craveo-search"
        type="search"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {currentValue && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => (isControlled ? onChange('') : setInternalValue(''))}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </form>
  );
}
