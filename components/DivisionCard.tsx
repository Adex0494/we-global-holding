'use client';

import Link from 'next/link';
import type { Division } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { GlassCard } from './ui';

interface DivisionCardProps {
  division: Division;
  showStatus?: boolean;
}

export default function DivisionCard({ division, showStatus = false }: DivisionCardProps) {
  const Icon = division.icon;
  const { t } = useTranslation();
  const divisionName = t(division.nameKey);

  return (
    <Link
      href={`/divisions/${division.id}`}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded-3xl"
      aria-label={`${divisionName} - ${t('learnMore')}`}
    >
      <GlassCard className="h-full" as="article">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-black/5" aria-hidden="true">
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-semibold">{divisionName}</h3>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          {t(division.descriptionKey)}
        </p>

        {showStatus && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600">{t('status')}:</span>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-black/5 rounded-full text-gray-800">
              {t(division.statusKey)}
            </span>
          </div>
        )}

        <span className="inline-flex items-center text-sm font-medium text-black" aria-hidden="true">
          {t('learnMore')}
          <span className="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </GlassCard>
    </Link>
  );
}
