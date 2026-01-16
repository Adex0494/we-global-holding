import { render, screen } from '../test-utils';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the site name as heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('WE Global Holding Inc.');
  });

  it('renders the subtitle', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 2, name: /A Scalable Global Ecosystem/i })).toBeInTheDocument();
  });

  it('renders the intro paragraphs', () => {
    render(<AboutPage />);
    expect(screen.getByText(/WE Global Holding Inc. is a global holding company/i)).toBeInTheDocument();
    expect(screen.getByText(/The divisions presented below/i)).toBeInTheDocument();
  });

  it('renders the Investment Positioning section', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /Investment Positioning/i })).toBeInTheDocument();
    expect(screen.getByText(/currently finalizing its structural, technological/i)).toBeInTheDocument();
  });

  it('renders the CTA section', () => {
    render(<AboutPage />);
    expect(screen.getByText(/For investment inquiries, strategic partnerships/i)).toBeInTheDocument();
  });

  it('renders the Explore Divisions link', () => {
    render(<AboutPage />);
    expect(screen.getByRole('link', { name: /Explore Divisions/i })).toBeInTheDocument();
  });

  it('has correct link to divisions page', () => {
    render(<AboutPage />);
    const exploreDivisionsLink = screen.getByRole('link', { name: /Explore Divisions/i });
    expect(exploreDivisionsLink).toHaveAttribute('href', '/divisions');
  });
});
