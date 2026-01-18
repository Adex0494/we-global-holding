import { useId } from 'react';
import type { FormFieldProps } from '@/types';

export default function Input({
  id: providedId,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  error,
  required,
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = providedId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-neutral-800"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'w-full rounded-2xl px-4 py-3',
          'bg-white',
          'border',
          error ? 'border-red-300' : 'border-neutral-200',
          'text-neutral-900 placeholder:text-neutral-400',
          'outline-none',
          'transition-colors duration-200',
          'focus:border-neutral-400 focus:ring-2',
          error ? 'focus:ring-red-100' : 'focus:ring-neutral-100',
          // Override browser autofill styling
          'autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]',
        ].join(' ')}
      />
      {error && (
        <span
          id={errorId}
          role="alert"
          className="mt-1 block text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </div>
  );
}
