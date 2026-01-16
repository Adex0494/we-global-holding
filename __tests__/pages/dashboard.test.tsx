import { render, screen } from '../test-utils';
import DashboardPage from '@/app/dashboard/page';

describe('DashboardPage', () => {
  it('renders the dashboard heading', () => {
    render(<DashboardPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Dashboard/i })).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Welcome to your WE Global Holding account/i)).toBeInTheDocument();
  });

  it('renders the business access verification card', () => {
    render(<DashboardPage />);
    expect(screen.getByRole('heading', { name: /Request Business Access Verification/i })).toBeInTheDocument();
  });

  it('renders the business access description', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Verify your business to unlock premium features/i)).toBeInTheDocument();
  });

  it('has link to business access request page', () => {
    render(<DashboardPage />);
    const businessAccessLink = screen.getByRole('link', { name: /Request Business Access Verification/i });
    expect(businessAccessLink).toHaveAttribute('href', '/business-access/request');
  });

  it('renders the arrow icon in the card', () => {
    render(<DashboardPage />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
