import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './HomePage.jsx';

function LocationPreview() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderHome(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<LocationPreview />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('<HomePage />', () => {
  it('renders the search input', () => {
    renderHome();
    expect(screen.getByPlaceholderText(/enter a github username/i)).toBeInTheDocument();
  });

  it('shows a validation error when submitting an empty form', async () => {
    renderHome();

    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByText(/please enter a username/i)).toBeInTheDocument();
  });

  it('navigates to the user page on successful submit', async () => {
    renderHome();

    await userEvent.type(screen.getByPlaceholderText(/enter a github/i), 'octocat');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByTestId('location')).toHaveTextContent('/user/octocat');
  });

  it('trims whitespace before navigating', async () => {
    renderHome();

    await userEvent.type(screen.getByPlaceholderText(/enter a github/i), '  octocat  ');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByTestId('location')).toHaveTextContent('/user/octocat');
  });

  it('clears the validation error when the user starts typing', async () => {
    renderHome();

    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByText(/please enter a username/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/enter a github/i), 'o');

    expect(screen.queryByText(/please enter a username/i)).toBeNull();
  });

  it('renders recent searches from localStorage', () => {
    localStorage.setItem('gh_recent_searches', JSON.stringify(['alice', 'bob']));

    renderHome();

    expect(screen.getByRole('button', { name: 'alice' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'bob' })).toBeInTheDocument();
  });

  it('navigates when a recent search chip is clicked', async () => {
    localStorage.setItem('gh_recent_searches', JSON.stringify(['alice']));

    renderHome();

    await userEvent.click(screen.getByRole('button', { name: 'alice' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/user/alice');
  });
});
