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

        <button
          className="
            mt-8 px-10 py-3 rounded-full font-semibold text-white 
            bg-black shadow-lg hover:shadow-xl transition
          "
        >
          Explore Divisions
        </button>
      </section>

      {/* ----------------- DIVISIONS ----------------- */}
      <section className="max-w-7xl mx-auto mt-24">
        <h2 className="text-3xl font-semibold text-black mb-12">
          Our Divisions
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Finance */}
          <div className="glass-card p-8 cursor-pointer transition-transform">
            <h3 className="text-xl font-semibold text-black mb-3">Finance</h3>
            <p className="text-gray-700">
              Learn more about our finance initiatives.
            </p>
          </div>

          {/* Technology */}
          <div className="glass-card p-8 cursor-pointer transition-transform">
            <h3 className="text-xl font-semibold text-black mb-3">
              Technology
            </h3>
            <p className="text-gray-700">
              Learn more about our technology initiatives.
            </p>
          </div>

          {/* Infrastructure */}
          <div className="glass-card p-8 cursor-pointer transition-transform">
            <h3 className="text-xl font-semibold text-black mb-3">
              Infrastructure
            </h3>
            <p className="text-gray-700">
              Learn more about our infrastructure initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="text-center mt-20 text-gray-700 text-sm">
        © 2025 WE Global Holding Inc. All rights reserved.
      </footer>
    </main>
  );
}
