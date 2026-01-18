import { useId } from 'react';
import type { SelectFieldProps } from '@/types';

export default function Select({
  id: providedId,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = providedId || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="block">
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-sm font-medium text-neutral-800"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'w-full rounded-2xl px-4 py-3',
          'bg-white',
          'border',
          error ? 'border-red-300' : 'border-neutral-200',
          'text-neutral-900',
          'outline-none',
          'transition-colors duration-200',
          'focus:border-neutral-400 focus:ring-2',
          error ? 'focus:ring-red-100' : 'focus:ring-neutral-100',
          'cursor-pointer',
          'appearance-none',
          'bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")]',
          'bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat',
        ].join(' ')}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
