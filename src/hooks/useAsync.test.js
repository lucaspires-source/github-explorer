import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useAsync } from './useAsync.js';

describe('useAsync', () => {
  it('starts in a loading state', () => {
    const fetcher = vi.fn(() => new Promise(() => {}));
    const { result } = renderHook(() => useAsync(fetcher, []));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('transitions to success when the promise resolves', async () => {
    const fetcher = vi.fn().mockResolvedValue({ id: 1 });
    const { result } = renderHook(() => useAsync(fetcher, []));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ id: 1 });
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('transitions to error when the promise rejects', async () => {
    const error = new Error('boom');
    const fetcher = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync(fetcher, []));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
  });

  it('passes an AbortSignal to the fetcher', async () => {
    const fetcher = vi.fn().mockResolvedValue('ok');
    renderHook(() => useAsync(fetcher, []));

    await waitFor(() => expect(fetcher).toHaveBeenCalled());
    const [signal] = fetcher.mock.calls[0];
    expect(signal).toBeInstanceOf(AbortSignal);
  });

  it('aborts the in-flight request when unmounted', () => {
    let capturedSignal;
    const fetcher = vi.fn((signal) => {
      capturedSignal = signal;
      return new Promise(() => {});
    });

    const { unmount } = renderHook(() => useAsync(fetcher, []));
    unmount();

    expect(capturedSignal.aborted).toBe(true);
  });

  it('refetches when dependencies change', async () => {
    const fetcher = vi.fn().mockResolvedValue('ok');
    const { rerender } = renderHook(({ id }) => useAsync(fetcher, [id]), {
      initialProps: { id: 'a' },
    });

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));

    rerender({ id: 'b' });

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  });

  it('ignores a stale resolution after a dependency change', async () => {
    let resolveFirst;
    const fetcher = vi
      .fn()
      .mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }))
      .mockResolvedValueOnce('second');

    const { result, rerender } = renderHook(({ id }) => useAsync(fetcher, [id]), {
      initialProps: { id: 'a' },
    });

    rerender({ id: 'b' });

    await waitFor(() => expect(result.current.data).toBe('second'));

    resolveFirst('first');

    await new Promise((r) => setTimeout(r, 0));

    expect(result.current.data).toBe('second');
  });
});
