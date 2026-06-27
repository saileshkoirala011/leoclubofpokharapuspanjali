import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const renderApp = (initialEntries = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );

describe('App', () => {
  it('renders the navbar on all routes', () => {
    renderApp();
    expect(screen.getByAltText('Leo Club Logo')).toBeInTheDocument();
  });

  it('renders the home page at /', () => {
    renderApp(['/']);
    expect(
      screen.getByText('Leadership, Experience, Opportunity'),
    ).toBeInTheDocument();
  });

  it('renders the about page at /Abouts', () => {
    renderApp(['/Abouts']);
    const aboutHeadings = screen.getAllByText('About Us');
    expect(aboutHeadings.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
  });

  it('renders the team page at /Team', () => {
    renderApp(['/Team']);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  it('renders the contact page at /Contact', () => {
    renderApp(['/Contact']);
    const contactHeadings = screen.getAllByText('Contact Us');
    expect(contactHeadings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the gallery page at /Gallery', () => {
    renderApp(['/Gallery']);
    const galleryHeadings = screen.getAllByText('Gallery');
    expect(galleryHeadings.length).toBeGreaterThanOrEqual(1);
  });
});
