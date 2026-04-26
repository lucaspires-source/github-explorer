import { useCallback } from 'react';
import { githubApi } from '../api/github.js';
import { useAsync } from './useAsync.js';

export function useUser(username) {
  const fetcher = useCallback(
    (signal) => githubApi.getUser(username, signal),
    [username],
  );
  return useAsync(fetcher, [username]);
}

export function useUserRepos(username) {
  const fetcher = useCallback(
    (signal) => githubApi.getUserRepos(username, signal),
    [username],
  );
  return useAsync(fetcher, [username]);
}

export function useRepo(owner, name) {
  const fetcher = useCallback(
    (signal) => githubApi.getRepo(owner, name, signal),
    [owner, name],
  );
  return useAsync(fetcher, [owner, name]);
}
