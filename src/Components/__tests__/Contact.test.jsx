import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../Contact';

const renderContact = () =>
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );

describe('Contact', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the heading', () => {
    renderContact();
    const headings = screen.getAllByText('Contact Us');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the contact form with all fields', () => {
    renderContact();
    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What's this about?")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Write your message here/),
    ).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderContact();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders contact info sections', () => {
    renderContact();
    expect(screen.getByText('Address')).toBeInTheDocument();
    const pokharaTexts = screen.getAllByText('Pokhara, Nepal');
    expect(pokharaTexts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    const emailLabels = screen.getAllByText('Email');
    expect(emailLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('updates form fields on user input', async () => {
    renderContact();
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText('Your full name');
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    const emailInput = screen.getByPlaceholderText('your@email.com');
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('displays character count for message field', () => {
    renderContact();
    expect(screen.getByText('0/5000')).toBeInTheDocument();
  });

  it('updates character count as message is typed', async () => {
    renderContact();
    const user = userEvent.setup();

    const messageInput = screen.getByPlaceholderText(/Write your message here/);
    await user.type(messageInput, 'Hello');
    expect(screen.getByText('5/5000')).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Your full name'), 'John');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@test.com');
    await user.type(screen.getByPlaceholderText("What's this about?"), 'Test Subject');
    await user.type(screen.getByPlaceholderText(/Write your message here/), 'Test message content');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/message has been sent successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false, message: 'Server error' }),
    });

    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Your full name'), 'John');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@test.com');
    await user.type(screen.getByPlaceholderText("What's this about?"), 'Test');
    await user.type(screen.getByPlaceholderText(/Write your message here/), 'Test msg');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('shows network error message on fetch failure', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Your full name'), 'John');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@test.com');
    await user.type(screen.getByPlaceholderText("What's this about?"), 'Test');
    await user.type(screen.getByPlaceholderText(/Write your message here/), 'Test msg');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('displays field-level errors from server', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          success: false,
          message: 'Validation failed',
          errors: [{ field: 'email', message: 'Invalid email address' }],
        }),
    });

    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Your full name'), 'John');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'bad');
    await user.type(screen.getByPlaceholderText("What's this about?"), 'Test');
    await user.type(screen.getByPlaceholderText(/Write your message here/), 'Test msg');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('renders the map iframe', () => {
    renderContact();
    expect(screen.getByTitle('Leo Club Pokhara Location')).toBeInTheDocument();
  });
});
