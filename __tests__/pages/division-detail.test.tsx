import { render, screen } from '../test-utils';
import DivisionPage from '@/app/divisions/[divisionId]/page';

const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  redirect: (url: string) => mockRedirect(url),
}));

const { useParams } = jest.requireMock('next/navigation');

describe('DivisionPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Auto-Match division correctly', () => {
    useParams.mockReturnValue({ divisionId: 'auto-match' });
    render(<DivisionPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Auto-Match'
    );
  });

  it('renders the WE Global Verified division correctly', () => {
    useParams.mockReturnValue({ divisionId: 'we-global-verified' });
    render(<DivisionPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'WE Global Verified'
    );
  });

  it('renders the Technology division correctly', () => {
    useParams.mockReturnValue({ divisionId: 'technology' });
    render(<DivisionPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Technology Division'
    );
  });

  it('renders the Franchising division correctly', () => {
    useParams.mockReturnValue({ divisionId: 'franchising' });
    render(<DivisionPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Franchising & Business Expansion'
    );
  });

  it('redirects to divisions page for invalid division', () => {
    useParams.mockReturnValue({ divisionId: 'invalid-division' });
    expect(() => render(<DivisionPage />)).toThrow();
  });

  it('renders the division image', () => {
    useParams.mockReturnValue({ divisionId: 'auto-match' });
    render(<DivisionPage />);
    const image = screen.getByRole('img', { name: 'Auto-Match' });
    expect(image).toBeInTheDocument();
  });

  it('renders the about section', () => {
    useParams.mockReturnValue({ divisionId: 'property-networking' });
    render(<DivisionPage />);
    expect(screen.getByText('About this Division')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    useParams.mockReturnValue({ divisionId: 'auto-match' });
    render(<DivisionPage />);
    const statusElements = screen.getAllByText('Investment Readiness Stage');
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it('renders the sign up and request access link', () => {
    useParams.mockReturnValue({ divisionId: 'jetline' });
    render(<DivisionPage />);
    expect(screen.getByRole('link', { name: 'Sign up and request access' })).toHaveAttribute(
      'href',
      '/login'
    );
  });
});
