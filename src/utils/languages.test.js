import { describe, expect, it } from 'vitest';

import { getLanguageColor } from './languages.js';

describe('getLanguageColor', () => {
  it('returns the color for known languages', () => {
    expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
    expect(getLanguageColor('TypeScript')).toBe('#3178c6');
    expect(getLanguageColor('Rust')).toBe('#dea584');
  });

  it('returns the fallback color for unknown languages', () => {
    expect(getLanguageColor('Brainfuck')).toBe('#8b949e');
  });

  it('returns the fallback color for nullish input', () => {
    expect(getLanguageColor(null)).toBe('#8b949e');
    expect(getLanguageColor(undefined)).toBe('#8b949e');
  });
});
