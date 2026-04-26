import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import UserCard from './UserCard.jsx';
import { buildUser } from '../test/fixtures.js';

describe('<UserCard />', () => {
  it('renders name and login', () => {
    render(<UserCard user={buildUser()} />);
    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
  });

  it('falls back to login when name is missing', () => {
    render(<UserCard user={buildUser({ name: null })} />);
    expect(screen.getAllByText(/octocat/i).length).toBeGreaterThan(0);
  });

  it('formats follower and following counts', () => {
    render(<UserCard user={buildUser({ followers: 12_500, following: 300 })} />);
    expect(screen.getByText('12.5k')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
  });

  it('renders optional fields when present', () => {
    render(<UserCard user={buildUser()} />);
    expect(screen.getByText('octocat@github.com')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
  });

  it('hides optional fields when missing', () => {
    render(
      <UserCard
        user={buildUser({ email: null, location: null, blog: null, bio: null })}
      />,
    );
    expect(screen.queryByText('octocat@github.com')).toBeNull();
    expect(screen.queryByText('San Francisco')).toBeNull();
  });

  it('links to the GitHub profile', () => {
    render(<UserCard user={buildUser()} />);
    const link = screen.getByRole('link', { name: /github profile/i });
    expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('prefixes bare blog URLs with https://', () => {
    render(<UserCard user={buildUser({ blog: 'example.com' })} />);
    const blogLink = screen.getByRole('link', { name: 'example.com' });
    expect(blogLink).toHaveAttribute('href', 'https://example.com');
  });
});
