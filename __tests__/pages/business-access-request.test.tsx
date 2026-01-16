import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import BusinessAccessRequestPage from '@/app/business-access/request/page';

describe('BusinessAccessRequestPage', () => {
  it('renders the page title', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Business Access Verification Request/i })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByText(/Complete this form to request business access/i)).toBeInTheDocument();
  });

  it('renders the Company Information section', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('heading', { name: /Company Information/i })).toBeInTheDocument();
  });

  it('renders the Authorized Representative section', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('heading', { name: /Authorized Representative/i })).toBeInTheDocument();
  });

  it('renders the Interest section', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('heading', { name: /^Interest$/i })).toBeInTheDocument();
  });

  it('renders the Supporting Documents section', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('heading', { name: /Supporting Documents/i })).toBeInTheDocument();
  });

  it('renders all required form fields', () => {
    render(<BusinessAccessRequestPage />);

    expect(screen.getByLabelText(/Legal Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country of Incorporation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Registration Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporate Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Representative Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Position\/Title/i)).toBeInTheDocument();
  });

  it('renders optional form fields', () => {
    render(<BusinessAccessRequestPage />);

    expect(screen.getByLabelText(/State\/Province/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Social Link/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByRole('button', { name: /Submit Request/i })).toBeInTheDocument();
  });

  it('submit button is initially disabled', () => {
    render(<BusinessAccessRequestPage />);
    const submitButton = screen.getByRole('button', { name: /Submit Request/i });
    expect(submitButton).toBeDisabled();
  });

  it('renders the disclaimer', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByText(/Disclaimer:/i)).toBeInTheDocument();
    expect(screen.getByText(/WE Global Holding Inc. performs an internal review/i)).toBeInTheDocument();
  });

  it('renders the word count indicator', () => {
    render(<BusinessAccessRequestPage />);
    expect(screen.getByText(/0 \/ 150/i)).toBeInTheDocument();
  });

  it('allows typing in form fields', async () => {
    const user = userEvent.setup();
    render(<BusinessAccessRequestPage />);

    const companyNameInput = screen.getByLabelText(/Legal Company Name/i);
    await user.type(companyNameInput, 'Test Company LLC');

    expect(companyNameInput).toHaveValue('Test Company LLC');
  });

  it('updates word count when typing in interest explanation', async () => {
    const user = userEvent.setup();
    render(<BusinessAccessRequestPage />);

    const interestTextarea = screen.getByLabelText(/Briefly explain your interest/i);
    await user.type(interestTextarea, 'This is a test explanation');

    expect(screen.getByText(/5 \/ 150/i)).toBeInTheDocument();
  });
});
