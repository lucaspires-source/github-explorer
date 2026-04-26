import { useMemo, useState } from 'react';

export const SORT_OPTIONS = [
  { value: 'stargazers_count', label: 'Stars' },
  { value: 'forks_count', label: 'Forks' },
  { value: 'name', label: 'Name' },
  { value: 'updated_at', label: 'Updated' },
];

const compareValues = (a, b) => {
  if (typeof a === 'string') return a.localeCompare(b ?? '');
  if (a == null) return -1;
  if (b == null) return 1;
  return a - b;
};

export function useSortedRepos(repos) {
  const [sortBy, setSortBy] = useState('stargazers_count');
  const [direction, setDirection] = useState('desc');

  const sorted = useMemo(() => {
    if (!repos?.length) return [];
    const multiplier = direction === 'desc' ? -1 : 1;
    return [...repos].sort((a, b) => compareValues(a[sortBy], b[sortBy]) * multiplier);
  }, [repos, sortBy, direction]);

  const toggleDirection = () =>
    setDirection((d) => (d === 'desc' ? 'asc' : 'desc'));

  return { sorted, sortBy, direction, setSortBy, toggleDirection };
}
