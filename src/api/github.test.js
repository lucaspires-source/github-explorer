import { describe, expect, it } from 'vitest';

import { getErrorMessage } from './github.js';

describe('getErrorMessage', () => {
  it('returns a "not found" message for 404 responses', () => {
    expect(getErrorMessage({ response: { status: 404 } })).toBe('Not found.');
  });

  it('returns a rate-limit message for 403 responses', () => {
    expect(getErrorMessage({ response: { status: 403 } })).toMatch(/rate limit/i);
  });

  it('returns the fallback for other statuses', () => {
    expect(getErrorMessage({ response: { status: 500 } })).toBe('Something went wrong.');
  });

  it('accepts a custom fallback message', () => {
    expect(
      getErrorMessage({ response: { status: 500 } }, 'Custom fallback.'),
    ).toBe('Custom fallback.');
  });

  it('returns the fallback when no response is attached', () => {
    expect(getErrorMessage(new Error('network down'))).toBe('Something went wrong.');
    expect(getErrorMessage(null)).toBe('Something went wrong.');
  });
});
