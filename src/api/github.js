import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export const githubApi = {
  async getUser(username, signal) {
    const { data } = await client.get(`/users/${username}`, { signal });
    return data;
  },

  async getUserRepos(username, signal) {
    const { data } = await client.get(`/users/${username}/repos`, {
      params: { per_page: 100 },
      signal,
    });
    return data;
  },

  async getRepo(owner, name, signal) {
    const { data } = await client.get(`/repos/${owner}/${name}`, { signal });
    return data;
  },
};

export function getErrorMessage(error, fallback = 'Something went wrong.') {
  const status = error?.response?.status;
  if (status === 404) return 'Not found.';
  if (status === 403) return 'GitHub API rate limit reached. Try again in a minute or add a token.';
  return fallback;
}
