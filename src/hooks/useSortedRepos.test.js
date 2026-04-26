import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { buildRepo } from '../test/fixtures.js';
import { useSortedRepos } from './useSortedRepos.js';

describe('useSortedRepos', () => {
  it('defaults to stars descending', () => {
    const repos = [
      buildRepo({ id: 1, stargazers_count: 5 }),
      buildRepo({ id: 2, stargazers_count: 100 }),
      buildRepo({ id: 3, stargazers_count: 20 }),
    ];

    const { result } = renderHook(() => useSortedRepos(repos));

    expect(result.current.sortBy).toBe('stargazers_count');
    expect(result.current.direction).toBe('desc');
    expect(result.current.sorted.map((r) => r.id)).toEqual([2, 3, 1]);
  });

  it('toggles direction', () => {
    const repos = [
      buildRepo({ id: 1, stargazers_count: 5 }),
      buildRepo({ id: 2, stargazers_count: 100 }),
    ];

    const { result } = renderHook(() => useSortedRepos(repos));

    act(() => result.current.toggleDirection());

    expect(result.current.direction).toBe('asc');
    expect(result.current.sorted.map((r) => r.id)).toEqual([1, 2]);
  });

  it('sorts strings with locale compare', () => {
    const repos = [
      buildRepo({ id: 1, name: 'banana' }),
      buildRepo({ id: 2, name: 'apple' }),
      buildRepo({ id: 3, name: 'cherry' }),
    ];

    const { result } = renderHook(() => useSortedRepos(repos));

    act(() => result.current.setSortBy('name'));

    expect(result.current.sorted.map((r) => r.id)).toEqual([3, 1, 2]);
  });

  it('returns an empty array when repos is empty or undefined', () => {
    const empty = renderHook(() => useSortedRepos([]));
    expect(empty.result.current.sorted).toEqual([]);

    const missing = renderHook(() => useSortedRepos(undefined));
    expect(missing.result.current.sorted).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const repos = [
      buildRepo({ id: 1, stargazers_count: 5 }),
      buildRepo({ id: 2, stargazers_count: 100 }),
    ];
    const before = repos.map((r) => r.id);

    renderHook(() => useSortedRepos(repos));

    expect(repos.map((r) => r.id)).toEqual(before);
  });
});
