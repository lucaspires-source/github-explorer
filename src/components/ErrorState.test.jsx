import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorState from './ErrorState.jsx';

describe('<ErrorState />', () => {
  it('renders the message', () => {
    render(<ErrorState message="Something broke" />);
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('does not render an action button without actionLabel and onAction', () => {
    render(<ErrorState message="Something broke" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('invokes onAction when the button is clicked', async () => {
    const onAction = vi.fn();
    render(
      <ErrorState message="Something broke" actionLabel="Retry" onAction={onAction} />,
    );

    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    expect(onAction).toHaveBeenCalledOnce();
  });
});
