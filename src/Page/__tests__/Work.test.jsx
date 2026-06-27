import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Work from '../Work';

describe('Work', () => {
  it('renders the section heading', () => {
    render(<Work />);
    expect(screen.getByText('Our Work')).toBeInTheDocument();
  });

  it('renders all four work categories', () => {
    render(<Work />);
    expect(screen.getByText('Community Service')).toBeInTheDocument();
    expect(screen.getByText('Environment')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Youth Empowerment')).toBeInTheDocument();
  });

  it('renders descriptions for each category', () => {
    render(<Work />);
    expect(
      screen.getByText(/blood donation drives/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Tree plantation/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/distributing learning materials/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Leadership training/i),
    ).toBeInTheDocument();
  });

  it('renders four card elements', () => {
    const { container } = render(<Work />);
    const cards = container.querySelectorAll('.grid > div');
    expect(cards.length).toBe(4);
  });
});
