import type { FormFieldProps } from '@/types';

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  error,
  required,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={[
          'w-full rounded-2xl px-4 py-3',
          'bg-white/50',
          'border',
          error ? 'border-red-300' : 'border-white/40',
          'text-neutral-900 placeholder:text-neutral-500',
          'outline-none',
          'focus:bg-white/60 focus:border-white/60 focus:ring-2',
          error ? 'focus:ring-red-200' : 'focus:ring-neutral-200',
        ].join(' ')}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
