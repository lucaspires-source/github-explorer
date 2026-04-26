import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortControls from './SortControls.jsx';

const setup = (overrides = {}) => {
  const props = {
    sortBy: 'stargazers_count',
    direction: 'desc',
    onSortByChange: vi.fn(),
    onToggleDirection: vi.fn(),
    ...overrides,
  };
  render(<SortControls {...props} />);
  return props;
};

describe('<SortControls />', () => {
  it('reflects the current sort field in the select', () => {
    setup({ sortBy: 'forks_count' });
    expect(screen.getByLabelText(/sort by/i)).toHaveValue('forks_count');
  });

  it('calls onSortByChange when the field changes', async () => {
    const { onSortByChange } = setup();

    await userEvent.selectOptions(screen.getByLabelText(/sort by/i), 'name');

    expect(onSortByChange).toHaveBeenCalledWith('name');
  });

  it('calls onToggleDirection when the direction button is clicked', async () => {
    const { onToggleDirection } = setup();

    await userEvent.click(screen.getByRole('button', { name: /descending/i }));

    expect(onToggleDirection).toHaveBeenCalledOnce();
  });

  it('reflects the current direction in the button label', () => {
    setup({ direction: 'asc' });
    expect(screen.getByRole('button', { name: /ascending/i })).toBeInTheDocument();
  });
});
