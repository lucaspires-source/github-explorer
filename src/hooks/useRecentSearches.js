import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'gh_recent_searches';
const MAX_ITEMS = 6;

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState(read);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) setSearches(read());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const add = useCallback((username) => {
    setSearches((prev) => {
      const next = [username, ...prev.filter((u) => u !== username)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSearches([]);
  }, []);

  return { searches, add, clear };
}
