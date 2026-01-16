'use client';

import { divisions } from '@/data/divisions';
import { useTranslation } from '@/lib/i18n';

export default function DivisionsPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      {/* PAGE HEADER */}
      <section className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">{t('divisionsPageTitle')}</h1>
        <h2 className="text-2xl text-gray-700 mb-6">{t('divisionsPageSubtitle')}</h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
          {t('divisionsPageIntro').split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* DIVISIONS GRID */}
      <section className="grid md:grid-cols-2 gap-10">
        {divisions.map((division) => {
          const Icon = division.icon;

          return (
            <div key={division.id} className="glass-card p-8">
              {/* TITLE + ICON */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-black/5">
                  <Icon className="w-6 h-6 text-black" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{t(division.nameKey)}</h3>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-800 leading-relaxed mb-4">
                {t(division.descriptionKey)}
              </p>

              {/* STATUS */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">{t('status')}:</span>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-black/5 rounded-full text-gray-800">
                  {t(division.statusKey)}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* INVESTMENT POSITIONING */}
      <section className="glass-card p-10">
        <h2 className="text-3xl font-bold mb-6">{t('investmentTitle')}</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          {t('investmentText')}
        </p>
      </section>

      {/* CTA */}
      <section className="glass-card p-10 text-center">
        <p className="text-gray-800 leading-relaxed text-lg">
          {t('ctaText')}
        </p>
      </section>
    </main>
  );
}
