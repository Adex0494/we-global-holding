import { useId } from 'react';

interface FileUploadProps {
  label?: string;
  disabled?: boolean;
  id?: string;
}

export default function FileUpload({
  label = 'Supporting Documents',
  disabled = true,
  id: providedId,
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = providedId || generatedId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className="block" role="group" aria-labelledby={labelId}>
      <span id={labelId} className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
        <span className="text-neutral-500 ml-1 font-normal">(Optional)</span>
      </span>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-describedby={descriptionId}
        aria-label={disabled ? 'File upload coming soon' : 'Drop files here or click to browse'}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            // Trigger file input when implemented
          }
        }}
        className={[
          'w-full rounded-2xl px-6 py-8',
          'bg-white/30',
          'border-2 border-dashed',
          disabled ? 'border-neutral-300' : 'border-white/40',
          'text-center',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-neutral-600" aria-hidden="true">
            {disabled
              ? 'File upload coming soon'
              : 'Drop files here or click to browse'}
          </p>
          <p id={descriptionId} className="text-xs text-neutral-500">
            PDF, JPG, PNG (max 2 files)
          </p>
        </div>
      </div>
    </div>
  );
}
