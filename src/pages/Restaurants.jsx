import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getRestaurants } from '../services/restaurantService';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import RestaurantGrid from '../components/RestaurantGrid';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { PRICE_RANGES, matchesQuery, sortRestaurants } from '../utils/helpers';

const DEFAULT_FILTERS = {
  cuisine: 'all',
  minRating: 0,
  priceRange: 'all',
  vegOnly: false,
};

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Search only runs 400ms after the user stops typing.
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus('loading');
      try {
        const data = await getRestaurants();
        if (ignore) return;
        setRestaurants(data);
        setStatus('success');
      } catch (error) {
        if (!ignore) setStatus('error');
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Keep the URL in sync so searches are shareable and refresh-safe.
  useEffect(() => {
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {}, { replace: true });
  }, [debouncedQuery, setSearchParams]);

  const cuisines = useMemo(() => {
    const unique = new Set(restaurants.flatMap((restaurant) => restaurant.cuisine));
    return [...unique].sort();
  }, [restaurants]);

  // Filtering + sorting is the only genuinely expensive derivation here,
  // so it is the one place useMemo is worth using.
  const visibleRestaurants = useMemo(() => {
    const priceRange = PRICE_RANGES.find((range) => range.id === filters.priceRange);

    const filtered = restaurants.filter((restaurant) => {
      if (!matchesQuery(restaurant, debouncedQuery)) return false;
      if (filters.cuisine !== 'all' && !restaurant.cuisine.includes(filters.cuisine)) return false;
      if (restaurant.rating < filters.minRating) return false;
      if (filters.vegOnly && !restaurant.isVeg) return false;
      if (priceRange && !priceRange.test(restaurant.priceForTwo)) return false;
      return true;
    });

    return sortRestaurants(filtered, sortBy);
  }, [restaurants, debouncedQuery, filters, sortBy]);

  const isSearching = query !== debouncedQuery;

  return (
    <main className="container stack">
      <header className="page-head">
        <h1>Restaurants{debouncedQuery && <span className="muted"> · “{debouncedQuery}”</span>}</h1>
        <p className="muted">
          {status === 'success'
            ? `${visibleRestaurants.length} of ${restaurants.length} restaurants`
            : 'Loading restaurants'}
        </p>
      </header>

      <div className="listing-toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search restaurants, cuisines or dishes"
        />
        <div className="listing-toolbar__right">
          <button
            type="button"
            className="btn btn--outline btn--sm filters-toggle"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((open) => !open)}
          >
            {showFilters ? 'Hide filters' : 'Filters'}
          </button>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="listing-layout">
        <div className={`listing-layout__filters ${showFilters ? 'is-open' : ''}`}>
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            cuisines={cuisines}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>

        <div className="listing-layout__results">
          {status === 'loading' && <Loading count={6} />}
          {status === 'error' && <ErrorState onRetry={() => window.location.reload()} />}

          {status === 'success' && (
            <>
              {isSearching && <p className="muted searching-note">Searching…</p>}
              {visibleRestaurants.length > 0 ? (
                <RestaurantGrid restaurants={visibleRestaurants} />
              ) : (
                <EmptyState
                  icon="🔍"
                  title="No restaurants found."
                  message="Try a different dish, cuisine or clear your filters."
                  action={
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => {
                        setFilters(DEFAULT_FILTERS);
                        setQuery('');
                      }}
                    >
                      Clear search &amp; filters
                    </button>
                  }
                />
              )}
            </>
          )}
        </div>
      </div>

      <p className="muted">
        Looking for something specific? <Link to="/">Browse categories</Link>.
      </p>
    </main>
  );
}
