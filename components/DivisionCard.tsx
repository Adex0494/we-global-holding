import Link from 'next/link';
import type { Division } from '@/types';

interface DivisionCardProps {
  division: Division;
}

export default function DivisionCard({ division }: DivisionCardProps) {
  const Icon = division.icon;

  return (
    <Link
      href={`/divisions/${division.id}`}
      className="group glass-card p-8 transition-all"
    >
      <div className="mb-4 inline-flex p-3 rounded-xl bg-black/5">
        <Icon className="w-6 h-6 text-black" />
      </div>

      <h3 className="text-xl font-semibold mb-2">{division.title}</h3>

      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        {division.subtitle}
      </p>

      <span className="inline-flex items-center text-sm font-medium text-black">
        Learn more
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
