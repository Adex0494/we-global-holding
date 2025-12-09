export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-primary text-white px-8 md:px-20 lg:px-40 py-20">
      {/* ---- HERO SECTION ---- */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg opacity-80 leading-relaxed">
          WE Global Holding Inc. is a diversified investment and innovation firm
          focused on empowering global markets through technology, finance,
          infrastructure, and strategic partnerships.
        </p>
      </section>

      {/* ---- OUR MISSION ---- */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg opacity-80 leading-relaxed">
          Our mission is to identify, develop, and support innovative projects
          capable of redefining industries and expanding economic opportunities
          across multiple global sectors.
        </p>
      </section>

      {/* ---- OUR VALUES ---- */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold mb-6">Our Core Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="opacity-70">
              We drive new ideas that transform industries and create lasting
              value.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="opacity-70">
              We operate with transparency, accountability, and ethical
              leadership.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Global Impact</h3>
            <p className="opacity-70">
              We invest in opportunities that uplift communities and economies
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ---- LEADERSHIP PREVIEW ---- */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold mb-6">Leadership</h2>
        <p className="text-lg opacity-80 leading-relaxed mb-8">
          Our leadership team is composed of experts in finance, technology, and
          global strategy, each bringing years of experience to guide our
          long-term vision.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 opacity-30">
          {/* Placeholder cards until you provide real people */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-36"></div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-36"></div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-36"></div>
        </div>
      </section>
    </main>
  );
}
