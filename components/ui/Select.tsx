import type { SelectFieldProps } from '@/types';

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={[
          'w-full rounded-2xl px-4 py-3',
          'bg-white/50',
          'border',
          error ? 'border-red-300' : 'border-white/40',
          'text-neutral-900',
          'outline-none',
          'focus:bg-white/60 focus:border-white/60 focus:ring-2',
          error ? 'focus:ring-red-200' : 'focus:ring-neutral-200',
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
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
