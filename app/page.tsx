import { divisions } from '@/data/divisions';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full pt-32 pb-24 px-6 md:px-12 lg:px-20">
      {/* ----------------- HERO ----------------- */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          WE Global Holding Inc.
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Empowering global innovation, investment, and growth across
          industries.
        </p>

        <Link
          href="/divisions"
          className="
    glass-card
    group
    mt-8 inline-flex items-center justify-center
    px-10 py-3 rounded-full font-semibold text-black
    bg-white/30
    backdrop-blur-md
    border border-white/40
    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:bg-white/50
    hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
  "
        >
          <span className="relative z-10">Explore Divisions</span>

          {/* subtle shine */}
          <span
            className="
      pointer-events-none
      absolute inset-0
      rounded-full
      opacity-0
      bg-gradient-to-r
      from-transparent via-white/60 to-transparent
      translate-x-[-120%]
      transition-all duration-700
      group-hover:opacity-100
      group-hover:translate-x-[120%]
    "
          />
        </Link>
      </section>

      {/* ----------------- DIVISIONS ----------------- */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Strategic Divisions</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            WE Global Holding Inc. operates across multiple strategic sectors,
            connecting verified companies, capital, and opportunities worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {divisions.map((division) => {
            const Icon = division.icon;

            return (
              <Link
                key={division.id}
                href="/divisions"
                className="group glass-card p-8 transition-all"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-xl bg-black/5">
                  <Icon className="w-6 h-6 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{division.title}</h3>

                {/* Subtitle / teaser */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {division.subtitle}
                </p>

                {/* Learn more */}
                <span className="inline-flex items-center text-sm font-medium text-black">
                  Learn more
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="text-center mt-20 text-gray-700 text-sm">
        © 2025 WE Global Holding Inc. All rights reserved.
      </footer>
    </main>
  );
}
