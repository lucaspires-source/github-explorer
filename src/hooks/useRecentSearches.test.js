import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useRecentSearches } from './useRecentSearches.js';

const STORAGE_KEY = 'gh_recent_searches';

describe('useRecentSearches', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.searches).toEqual([]);
  });

  it('reads an existing list from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['alice', 'bob']));

    const { result } = renderHook(() => useRecentSearches());

    expect(result.current.searches).toEqual(['alice', 'bob']);
  });

  it('prepends new entries', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.add('alice'));
    act(() => result.current.add('bob'));

    expect(result.current.searches).toEqual(['bob', 'alice']);
  });

  it('deduplicates existing entries and moves them to the top', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.add('alice'));
    act(() => result.current.add('bob'));
    act(() => result.current.add('alice'));

    expect(result.current.searches).toEqual(['alice', 'bob']);
  });

  it('caps the list at 6 entries', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      for (let i = 0; i < 10; i += 1) {
        result.current.add(`user-${i}`);
      }
    });

    expect(result.current.searches).toHaveLength(6);
    expect(result.current.searches[0]).toBe('user-9');
  });

  it('persists entries to localStorage', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.add('alice'));

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(['alice']);
  });

  it('clear() resets state and storage', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.add('alice'));
    act(() => result.current.clear());

    expect(result.current.searches).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('recovers gracefully from corrupted storage', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid-json');

    const { result } = renderHook(() => useRecentSearches());

    expect(result.current.searches).toEqual([]);
  });
});
