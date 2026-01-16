import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('Global Holding Inc.')).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Navbar />);
    expect(screen.getByAltText('WE Logo')).toBeInTheDocument();
  });

  it('renders all navigation links in desktop nav', () => {
    render(<Navbar />);

    // Get all links and verify they exist (desktop + mobile versions)
    const homeLinks = screen.getAllByRole('link', { name: /Home/i });
    const aboutLinks = screen.getAllByRole('link', { name: /About/i });
    const divisionsLinks = screen.getAllByRole('link', { name: /Divisions/i });
    const loginLinks = screen.getAllByRole('link', { name: /Login/i });

    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(divisionsLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('has correct hrefs for navigation links', () => {
    render(<Navbar />);

    const homeLinks = screen.getAllByRole('link', { name: /Home/i });
    expect(homeLinks[0]).toHaveAttribute('href', '/');

    const aboutLinks = screen.getAllByRole('link', { name: /About/i });
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');

    const divisionsLinks = screen.getAllByRole('link', { name: /Divisions/i });
    expect(divisionsLinks[0]).toHaveAttribute('href', '/divisions');

    const loginLinks = screen.getAllByRole('link', { name: /Login/i });
    expect(loginLinks[0]).toHaveAttribute('href', '/login');
  });

  it('renders the mobile menu toggle button', () => {
    render(<Navbar />);
    // Find the button that controls the mobile drawer
    const toggleButton = screen.getByRole('button', { expanded: false });
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens mobile drawer when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Find the menu button that controls the mobile drawer
    const toggleButton = screen.getByRole('button', { expanded: false });
    await user.click(toggleButton);

    // After clicking, the drawer should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the welcome text in mobile drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { expanded: false });
    await user.click(toggleButton);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('closes mobile drawer when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Open the drawer
    const toggleButton = screen.getByRole('button', { expanded: false });
    await user.click(toggleButton);

    // Find and click the close button (aria-label="Close menu")
    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    await user.click(closeButtons[0]);

    // The drawer should close (but the dialog element may still be in DOM with different visibility)
    const toggleButtonAfter = screen.getByRole('button', { expanded: false });
    expect(toggleButtonAfter).toBeInTheDocument();
  });

  it('renders footer text in mobile drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { expanded: false });
    await user.click(toggleButton);

    expect(screen.getByText(/Premium enterprise access/i)).toBeInTheDocument();
  });
});
