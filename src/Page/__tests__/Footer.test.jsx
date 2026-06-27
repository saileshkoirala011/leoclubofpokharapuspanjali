import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe('Footer', () => {
  it('renders the club name', () => {
    renderFooter();
    expect(screen.getByText('Puspanjali')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    renderFooter();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderFooter();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Pokhara, Nepal')).toBeInTheDocument();
    expect(screen.getByText('+977-61-XXXXXX')).toBeInTheDocument();
  });

  it('displays the current year in copyright', () => {
    renderFooter();
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${year}`)),
    ).toBeInTheDocument();
  });

  it('renders social media links', () => {
    renderFooter();
    const fbLink = document.querySelector('a[href*="facebook.com"]');
    const igLink = document.querySelector('a[href*="instagram.com"]');
    expect(fbLink).toBeInTheDocument();
    expect(igLink).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    renderFooter();
    const fbLink = document.querySelector('a[href*="facebook.com"]');
    expect(fbLink).toHaveAttribute('target', '_blank');
    expect(fbLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
