import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatCount, formatDate, timeAgo } from './format.js';

describe('formatCount', () => {
  it('returns "0" for nullish values', () => {
    expect(formatCount(null)).toBe('0');
    expect(formatCount(undefined)).toBe('0');
    expect(formatCount(0)).toBe('0');
  });

  it('returns stringified number below 1_000', () => {
    expect(formatCount(42)).toBe('42');
    expect(formatCount(999)).toBe('999');
  });

  it('formats thousands with a "k" suffix', () => {
    expect(formatCount(1_000)).toBe('1.0k');
    expect(formatCount(1_234)).toBe('1.2k');
    expect(formatCount(12_500)).toBe('12.5k');
  });

  it('formats millions with an "M" suffix', () => {
    expect(formatCount(1_000_000)).toBe('1.0M');
    expect(formatCount(2_500_000)).toBe('2.5M');
  });
});

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "today" for the same day', () => {
    expect(timeAgo('2025-01-15T10:00:00Z')).toBe('today');
  });

  it('returns "yesterday" for 1 day ago', () => {
    expect(timeAgo('2025-01-14T12:00:00Z')).toBe('yesterday');
  });

  it('returns days for ranges below 30 days', () => {
    expect(timeAgo('2025-01-10T12:00:00Z')).toBe('5d ago');
  });

  it('returns months for ranges below 365 days', () => {
    expect(timeAgo('2024-11-15T12:00:00Z')).toBe('2mo ago');
  });

  it('returns years for ranges 365 days or more', () => {
    expect(timeAgo('2023-01-15T12:00:00Z')).toBe('2yr ago');
  });
});

describe('formatDate', () => {
  it('formats ISO dates as "Mon D, YYYY"', () => {
    expect(formatDate('2024-03-15T12:00:00Z')).toMatch(/Mar 1[45], 2024/);
  });
});
