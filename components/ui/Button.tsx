import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:shadow-md hover:-translate-y-[1px]',
  secondary: 'bg-white/30 text-black border border-white/40 hover:bg-white/50',
  ghost: 'bg-transparent text-black hover:bg-black/5',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-3 rounded-2xl',
  lg: 'px-10 py-3 rounded-full text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          'font-medium transition-all duration-200',
          'shadow-sm active:translate-y-0',
          'focus:outline-none focus:ring-2 focus:ring-neutral-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(' ')}
        {...props}
      >
        {isLoading ? 'Loading…' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
