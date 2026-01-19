'use client';

import { divisions } from '@/data/divisions';
import { useTranslation } from '@/lib/i18n';
import DivisionCard from '@/components/DivisionCard';
import { GlassCard } from '@/components/ui';

export default function DivisionsPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-6 py-24 space-y-16" role="main">
      {/* PAGE HEADER */}
      <section className="max-w-3xl" aria-labelledby="divisions-page-heading">
        <h1 id="divisions-page-heading" className="text-5xl font-bold mb-4">{t('divisionsPageTitle')}</h1>
        <h2 id="divisions-page-subtitle" className="text-2xl text-gray-700 mb-6">{t('divisionsPageSubtitle')}</h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
          {t('divisionsPageIntro').split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* DIVISIONS GRID */}
      <section aria-label="Our divisions">
        <div className="grid md:grid-cols-2 gap-10" role="list" aria-label="Company divisions">
          {divisions.map((division) => (
            <div key={division.id} role="listitem">
              <DivisionCard division={division} showStatus />
            </div>
          ))}
        </div>
      </section>

      {/* INVESTMENT POSITIONING */}
      <GlassCard as="section" enableHover={false} className="p-2" aria-labelledby="investment-title">
        <h2 id="investment-title" className="text-3xl font-bold mb-6">{t('investmentTitle')}</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          {t('investmentText')}
        </p>
      </GlassCard>

      {/* CTA */}
      <GlassCard as="section" enableHover={false} className="p-2 text-center" aria-label="Call to action">
        <p className="text-gray-800 leading-relaxed text-lg">
          {t('ctaText')}
        </p>
      </GlassCard>
    </main>
  );
}
