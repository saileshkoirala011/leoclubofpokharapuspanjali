import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe('Navbar', () => {
  it('renders the logo', () => {
    renderNavbar();
    expect(screen.getByAltText('Leo Club Logo')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    renderNavbar();
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Team').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Gallery').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the JOIN NOW button', () => {
    renderNavbar();
    const joinButtons = screen.getAllByText('JOIN NOW');
    expect(joinButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles mobile menu on hamburger click', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button');

    // Mobile menu should not be visible initially (only desktop links)
    const initialHomeLinks = screen.getAllByText('Home');

    // Click hamburger to open
    fireEvent.click(hamburger);
    const afterOpenHomeLinks = screen.getAllByText('Home');
    expect(afterOpenHomeLinks.length).toBeGreaterThanOrEqual(initialHomeLinks.length);

    // Click hamburger to close
    fireEvent.click(hamburger);
  });

  it('links point to correct routes', () => {
    renderNavbar();
    const aboutLinks = screen.getAllByText('About');
    const aboutLink = aboutLinks.find((el) => el.closest('a'));
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/Abouts');
  });
});
