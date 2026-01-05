interface FileUploadProps {
  label?: string;
  disabled?: boolean;
}

export default function FileUpload({
  label = 'Supporting Documents',
  disabled = true,
}: FileUploadProps) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
        <span className="text-neutral-500 ml-1 font-normal">(Optional)</span>
      </span>
      <div
        className={[
          'w-full rounded-2xl px-6 py-8',
          'bg-white/30',
          'border-2 border-dashed',
          disabled ? 'border-neutral-300' : 'border-white/40',
          'text-center',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-neutral-600">
            {disabled
              ? 'File upload coming soon'
              : 'Drop files here or click to browse'}
          </p>
          <p className="text-xs text-neutral-500">
            PDF, JPG, PNG (max 2 files)
          </p>
        </div>
      </div>
    </div>
  );
}
