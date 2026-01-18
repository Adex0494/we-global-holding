'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { divisions } from '@/data/divisions';
import { GlassCard } from '@/components/ui';

export default function DivisionPage() {
  const params = useParams<{ divisionId: string }>();
  const { t } = useTranslation();

  const division = divisions.find(
    (d) => d.id === params.divisionId
  );

  if (!division) {
    redirect('/divisions');
  }

  const Icon = division.icon;

  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-12">
      {/* Back Navigation */}
      <Link
        href="/divisions"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('backToDivisions')}</span>
      </Link>

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Division Info */}
        <div className="space-y-8">
          {/* Header with Icon */}
          <div className="flex items-start gap-5">
            <div className="p-4 rounded-2xl bg-black/5 backdrop-blur-sm">
              <Icon className="w-10 h-10 text-black" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                {t(division.nameKey)}
              </h1>
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  {t('status')}:
                </span>
                <span className="inline-block px-4 py-1.5 text-sm font-medium bg-black/5 backdrop-blur-sm rounded-full text-gray-800">
                  {t(division.statusKey)}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <GlassCard enableHover={false}>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t('aboutThisDivision')}</h2>
              <p className="text-gray-800 leading-relaxed text-lg">
                {t(division.descriptionKey)}
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Division Image */}
        <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <Image
            src={division.image}
            alt={t(division.nameKey)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <GlassCard enableHover={false}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('divisionStatus')}</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              <span className="text-gray-800">{t(division.statusKey)}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard enableHover={false}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('interestedInDivision')}</h3>
            <Link
              href="/business-access/request"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-black bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
            >
              {t('requestAccess')}
            </Link>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}
