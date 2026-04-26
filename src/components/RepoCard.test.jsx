import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RepoCard from './RepoCard.jsx';
import { buildRepo } from '../test/fixtures.js';

const renderCard = (overrides = {}) =>
  render(
    <MemoryRouter>
      <RepoCard repo={buildRepo(overrides)} />
    </MemoryRouter>,
  );

describe('<RepoCard />', () => {
  it('renders the name and description', () => {
    renderCard();
    expect(screen.getByText('hello-world')).toBeInTheDocument();
    expect(screen.getByText('My first repository')).toBeInTheDocument();
  });

  it('formats star and fork counts', () => {
    renderCard({ stargazers_count: 1500, forks_count: 250 });
    expect(screen.getByText('1.5k')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
  });

  it('links to the repository detail page', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/repo/octocat/hello-world');
  });

  it('renders the language name', () => {
    renderCard();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('shows a Fork badge when the repository is a fork', () => {
    renderCard({ fork: true });
    expect(screen.getByText('Fork')).toBeInTheDocument();
  });

  it('omits description when missing', () => {
    renderCard({ description: null });
    expect(screen.queryByText('My first repository')).toBeNull();
  });
});
