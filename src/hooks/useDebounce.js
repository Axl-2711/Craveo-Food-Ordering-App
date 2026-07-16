import { useEffect, useState } from 'react';

/**
 * Returns a copy of `value` that only updates after the user has
 * stopped changing it for `delay` ms. Used to avoid re-filtering the
 * restaurant list on every keystroke.
 */
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Cleanup cancels the pending timer whenever `value` changes again.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
