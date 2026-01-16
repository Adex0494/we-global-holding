import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';

describe('LoginPage', () => {
  it('renders the welcome heading', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
  });

  it('renders the sign in description', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Sign in to your/i)).toBeInTheDocument();
  });

  it('renders the email input field', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('renders the password input field', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders the sign in button', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('renders the create account link', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create one/i })).toBeInTheDocument();
  });

  it('has correct link to register page', () => {
    render(<LoginPage />);
    const registerLink = screen.getByRole('link', { name: /Create one/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('sign in button is initially disabled', () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole('button', { name: /Sign in/i });
    expect(signInButton).toBeDisabled();
  });

  it('enables sign in button when email and password are entered', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(signInButton).not.toBeDisabled();
  });

  it('keeps sign in button disabled with invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign in/i });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');

    expect(signInButton).toBeDisabled();
  });
});
