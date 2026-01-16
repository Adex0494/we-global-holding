import { render, screen } from '../test-utils';
import DivisionCard from '@/components/DivisionCard';
import { divisions } from '@/data/divisions';

describe('DivisionCard', () => {
  const testDivision = divisions[0]; // WE Global Verified

  it('renders the division name', () => {
    render(<DivisionCard division={testDivision} />);
    expect(screen.getByRole('heading', { name: 'WE Global Verified' })).toBeInTheDocument();
  });

  it('renders the division description', () => {
    render(<DivisionCard division={testDivision} />);
    expect(screen.getByText(/A business verification and membership infrastructure/i)).toBeInTheDocument();
  });

  it('renders the Learn more text', () => {
    render(<DivisionCard division={testDivision} />);
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('has correct link to division detail page', () => {
    render(<DivisionCard division={testDivision} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/divisions/${testDivision.id}`);
  });

  it('renders with the icon', () => {
    render(<DivisionCard division={testDivision} />);
    // The icon should be rendered as an SVG
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders correctly for Auto-Match division', () => {
    const autoMatchDivision = divisions[1];
    render(<DivisionCard division={autoMatchDivision} />);
    expect(screen.getByRole('heading', { name: 'Auto-Match' })).toBeInTheDocument();
  });

  it('renders correctly for Technology Division', () => {
    const techDivision = divisions[8];
    render(<DivisionCard division={techDivision} />);
    expect(screen.getByRole('heading', { name: 'Technology Division' })).toBeInTheDocument();
  });
});
