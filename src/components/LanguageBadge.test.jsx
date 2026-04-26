import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import LanguageBadge from './LanguageBadge.jsx';

describe('<LanguageBadge />', () => {
  it('renders nothing when no language is provided', () => {
    const { container } = render(<LanguageBadge language={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the language name', () => {
    render(<LanguageBadge language="Rust" />);
    expect(screen.getByText('Rust')).toBeInTheDocument();
  });

  it('wraps the name in a <strong> when bold is true', () => {
    render(<LanguageBadge language="Go" bold />);
    const label = screen.getByText('Go');
    expect(label.tagName).toBe('STRONG');
  });
});
