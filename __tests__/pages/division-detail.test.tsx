import { render, screen } from '../test-utils';
import DivisionPage from '@/app/divisions/[divisions]/page';

describe('DivisionPage', () => {
  it('renders the division name from params', () => {
    render(<DivisionPage params={{ divisions: 'auto-match' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Auto Match Division');
  });

  it('renders the under construction message', () => {
    render(<DivisionPage params={{ divisions: 'auto-match' }} />);
    expect(screen.getByText(/Page under construction/i)).toBeInTheDocument();
  });

  it('capitalizes multi-word division names correctly', () => {
    render(<DivisionPage params={{ divisions: 'we-global-verified' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('We Global Verified Division');
  });

  it('handles single word division names', () => {
    render(<DivisionPage params={{ divisions: 'technology' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Technology Division');
  });

  it('handles franchising division', () => {
    render(<DivisionPage params={{ divisions: 'franchising' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Franchising Division');
  });
});
