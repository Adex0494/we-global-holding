'use client';

import { useTranslation } from '@/lib/i18n';
import { GlassCard } from '@/components/ui';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          {t('siteName')}
        </h1>
        <h2 className="text-2xl text-gray-700 mb-8">
          {t('divisionsPageSubtitle')}
        </h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-4 text-left">
          {t('divisionsPageIntro').split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Investment Positioning */}
      <GlassCard enableHover={false}>
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">{t('investmentTitle')}</h2>
          <p className="text-gray-800 leading-relaxed text-lg">
            {t('investmentText')}
          </p>
        </div>
      </GlassCard>

      {/* CTA */}
      <GlassCard enableHover={false}>
        <div className="p-10 text-center">
          <p className="text-gray-800 leading-relaxed text-lg mb-6">
            {t('ctaText')}
          </p>
          <Link
            href="/divisions"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-black bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
          >
            {t('homeExploreDivisions')}
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
