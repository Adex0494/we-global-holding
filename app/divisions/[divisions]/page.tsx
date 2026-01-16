'use client';

import { useTranslation } from '@/lib/i18n';

interface Props {
  params: { divisions: string };
}

export default function DivisionPage({ params }: Props) {
  const { t } = useTranslation();

  const divisionName = params.divisions
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen p-10 pt-24">
      <h1 className="text-4xl font-bold">
        {divisionName} {t('divisionDivision')}
      </h1>
      <p className="mt-4 text-lg text-gray-700">{t('divisionUnderConstruction')}</p>
    </div>
  );
}
