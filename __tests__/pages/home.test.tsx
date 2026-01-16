import { render, screen } from '../test-utils';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the site name', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('WE Global Holding Inc.');
  });

  it('renders the hero tagline', () => {
    render(<HomePage />);
    expect(screen.getByText(/Empowering global innovation/i)).toBeInTheDocument();
  });

  it('renders the Explore Divisions button', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /Explore Divisions/i })).toBeInTheDocument();
  });

  it('renders the Our Strategic Divisions section title', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /Our Strategic Divisions/i })).toBeInTheDocument();
  });

  it('renders division cards', () => {
    render(<HomePage />);
    // Check for some division names
    expect(screen.getByText('WE Global Verified')).toBeInTheDocument();
    expect(screen.getByText('Auto-Match')).toBeInTheDocument();
    expect(screen.getByText('Property Networking')).toBeInTheDocument();
  });

  it('renders the footer with copyright', () => {
    render(<HomePage />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('has correct link to divisions page', () => {
    render(<HomePage />);
    const exploreDivisionsLink = screen.getByRole('link', { name: /Explore Divisions/i });
    expect(exploreDivisionsLink).toHaveAttribute('href', '/divisions');
  });
});
