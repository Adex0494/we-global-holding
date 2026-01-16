import { render, screen } from '../test-utils';
import DivisionsPage from '@/app/divisions/page';

describe('DivisionsPage', () => {
  it('renders the page title', () => {
    render(<DivisionsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Our Strategic Divisions');
  });

  it('renders the page subtitle', () => {
    render(<DivisionsPage />);
    expect(screen.getByRole('heading', { level: 2, name: /A Scalable Global Ecosystem/i })).toBeInTheDocument();
  });

  it('renders the intro paragraph', () => {
    render(<DivisionsPage />);
    expect(screen.getByText(/WE Global Holding Inc. is a global holding company/i)).toBeInTheDocument();
  });

  it('renders all 9 divisions', () => {
    render(<DivisionsPage />);

    const divisionNames = [
      'WE Global Verified',
      'Auto-Match',
      'Property Networking',
      'Global Logistics',
      'Franchising & Business Expansion',
      'In-House Products & Innovation',
      'JetLine',
      'Government & Infrastructure Projects',
      'Technology Division',
    ];

    divisionNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
  });

  it('renders division descriptions', () => {
    render(<DivisionsPage />);
    expect(screen.getByText(/A business verification and membership infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/A smart connectivity division focused on matching/i)).toBeInTheDocument();
  });

  it('renders status badges for divisions', () => {
    render(<DivisionsPage />);
    expect(screen.getAllByText('Preparation Phase').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Investment Readiness Stage').length).toBeGreaterThan(0);
  });

  it('renders the Investment Positioning section', () => {
    render(<DivisionsPage />);
    expect(screen.getByRole('heading', { name: /Investment Positioning/i })).toBeInTheDocument();
    expect(screen.getByText(/currently finalizing its structural, technological/i)).toBeInTheDocument();
  });

  it('renders the CTA section', () => {
    render(<DivisionsPage />);
    expect(screen.getByText(/For investment inquiries, strategic partnerships/i)).toBeInTheDocument();
  });

  it('renders status labels for each division', () => {
    render(<DivisionsPage />);
    const statusLabels = screen.getAllByText('Status:');
    expect(statusLabels.length).toBe(9);
  });
});
