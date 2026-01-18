import { useId } from 'react';
import type { TextareaFieldProps } from '@/types';

export default function Textarea({
  id: providedId,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 4,
  maxLength,
}: TextareaFieldProps) {
  const generatedId = useId();
  const textareaId = providedId || generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="block">
      <label
        htmlFor={textareaId}
        className="mb-1.5 block text-sm font-medium text-neutral-800"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        rows={rows}
        maxLength={maxLength}
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
          'resize-none',
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
