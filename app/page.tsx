'use client';

import Link from 'next/link';
import { divisions } from '@/data/divisions';
import { COPYRIGHT_YEAR } from '@/lib/constants';
import DivisionCard from '@/components/DivisionCard';
import { useTranslation } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full pt-32 pb-24 px-6 md:px-12 lg:px-20" role="main">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto mb-20" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold text-black mb-6">
          {t('siteName')}
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {t('homeHeroTagline')}
        </p>

        <Link
          href="/divisions"
          className="glass-card group mt-8 inline-flex items-center justify-center px-10 py-3 rounded-full font-semibold text-black bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
        >
          <span className="relative z-10">{t('homeExploreDivisions')}</span>
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-120%] transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[120%]" aria-hidden="true" />
        </Link>
      </section>

      {/* Divisions */}
      <section className="max-w-7xl mx-auto px-6" aria-labelledby="divisions-heading">
        <div className="max-w-3xl mb-12">
          <h2 id="divisions-heading" className="text-4xl font-bold mb-4">{t('homeDivisionsTitle')}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('homeDivisionsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Company divisions">
          {divisions.map((division) => (
            <div key={division.id} role="listitem">
              <DivisionCard division={division} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-700 text-sm" role="contentinfo">
        <p>{t('copyright')} {COPYRIGHT_YEAR} {t('siteName')}. {t('homeFooterRights')}</p>
      </footer>
    </main>
  );
}
