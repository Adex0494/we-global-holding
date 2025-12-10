import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full text-black bg-gradient-to-br from-[#fefefe] via-[#f7f9fb] to-[#eef4f8] px-8 md:px-20 lg:px-40 py-32">
      {/* ---- HERO SECTION ---- */}
      <section className="max-w-4xl mx-auto text-center mb-32">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          WE Global Holding Inc.
        </h1>

        <p className="text-lg opacity-80 leading-relaxed mb-10">
          Empowering global innovation, investment, and growth across
          industries.
        </p>

        <Link
          href="/divisions"
          className="px-8 py-3 rounded-full bg-black text-white font-medium shadow-xl hover:opacity-90 transition"
        >
          Explore Divisions
        </Link>
      </section>

      {/* ---- OUR DIVISIONS ---- */}
      <section className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-10">Our Divisions</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* ---- CARD 1 ---- */}
          <Link
            href="/divisions"
            className="glass-card bg-glass glass-rounded p-8 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold mb-3 group-hover:opacity-80 transition">
              Finance
            </h3>
            <p className="text-sm opacity-70">
              Learn more about our finance initiatives.
            </p>
          </Link>

          {/* ---- CARD 2 ---- */}
          <Link
            href="/divisions"
            className="glass-card bg-glass glass-rounded p-8 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold mb-3 group-hover:opacity-80 transition">
              Technology
            </h3>
            <p className="text-sm opacity-70">
              Learn more about our technology initiatives.
            </p>
          </Link>

          {/* ---- CARD 3 ---- */}
          <Link
            href="/divisions"
            className="glass-card bg-glass glass-rounded p-8 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold mb-3 group-hover:opacity-80 transition">
              Infrastructure
            </h3>
            <p className="text-sm opacity-70">
              Learn more about our infrastructure initiatives.
            </p>
          </Link>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="text-center mt-20 text-sm opacity-60">
        © 2025 WE Global Holding Inc. All rights reserved.
      </footer>
    </main>
  );
}
