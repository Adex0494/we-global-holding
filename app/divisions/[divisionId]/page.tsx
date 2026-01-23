'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { divisions } from '@/data/divisions';
import { GlassCard } from '@/components/ui';

export default function DivisionPage() {
  const params = useParams<{ divisionId: string }>();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Check if user is logged in
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session', { credentials: 'include' });
        const data = await res.json();
        setIsLoggedIn(data.ok && data.session);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkSession();
  }, []);

  const division = divisions.find(
    (d) => d.id === params.divisionId
  );

  if (!division) {
    redirect('/divisions');
  }

  const Icon = division.icon;

  const divisionName = t(division.nameKey);

  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-12" role="main">
      {/* Back Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/divisions"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t('backToDivisions')}</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-start" aria-labelledby="division-heading">
        {/* Division Info */}
        <div className="space-y-8">
          {/* Header with Icon */}
          <div className="flex items-start gap-5">
            <div className="p-4 rounded-2xl bg-black/5 backdrop-blur-sm" aria-hidden="true">
              <Icon className="w-10 h-10 text-black" />
            </div>
            <div>
              <h1 id="division-heading" className="text-4xl lg:text-5xl font-bold mb-3">
                {divisionName}
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
          <GlassCard enableHover={false} aria-labelledby="about-division-heading">
            <div className="space-y-4">
              <h2 id="about-division-heading" className="text-xl font-semibold">{t('aboutThisDivision')}</h2>
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
            alt={`${divisionName} division illustration`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Additional Info Section */}
      <section className={`grid ${isLoggedIn === false ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`} aria-label="Division details">
        <GlassCard enableHover={false} aria-labelledby="status-heading">
          <div className="space-y-3">
            <h3 id="status-heading" className="text-lg font-semibold">{t('divisionStatus')}</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true" />
              <span className="text-gray-800">{t(division.statusKey)}</span>
            </div>
          </div>
        </GlassCard>

        {/* CTA only shown for logged-out users */}
        {isLoggedIn === false && (
          <GlassCard enableHover={false} aria-labelledby="interested-heading">
            <div className="space-y-3">
              <h3 id="interested-heading" className="text-lg font-semibold">{t('interestedInDivision')}</h3>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-black bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
              >
                {t('signUpAndRequestAccess')}
              </Link>
            </div>
          </GlassCard>
        )}
      </section>
    </main>
  );
}
