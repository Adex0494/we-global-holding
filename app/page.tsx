import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full flex items-center justify-center">
        <Image
          src="/bg.jpg"
          alt="City Background"
          fill
          priority
          className="object-cover opacity-60"
        />

        <div className="relative z-10 text-center">
          <Image
            src="/logo-we.png"
            alt="WE Logo"
            width={260}
            height={120}
            className="mx-auto mb-6"
          />

          <h1 className="text-4xl font-bold tracking-wide">
            WE Global Holding Inc.
          </h1>

          <p className="text-lg opacity-80 mt-4">
            Empowering global innovation, investment, and growth.
          </p>

          <Link
            href="/divisions"
            className="mt-8 inline-block px-6 py-3 bg-white/10 backdrop-blur-md
                       border border-white/20 rounded-xl hover:bg-white/20
                       transition-all duration-300"
          >
            Explore Divisions
          </Link>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>

        <p className="text-lg opacity-80 leading-relaxed">
          WE Global Holding Inc. is a diversified investment and innovation firm
          focused on empowering global markets through technology, finance,
          infrastructure, and strategic partnerships.
        </p>

        <Link
          href="/about"
          className="inline-block mt-4 text-blue-300 hover:text-blue-400"
        >
          Learn more →
        </Link>
      </section>

      {/* DIVISIONS PREVIEW */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold mb-10">Our Divisions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Finance', 'Technology', 'Infrastructure'].map((division) => (
            <Link
              key={division}
              href="/divisions"
              className="bg-white/5 p-6 rounded-2xl border border-white/10 
                         hover:bg-white/10 transition-all duration-300 
                         backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-2">{division}</h3>
              <p className="opacity-80 text-sm">
                Learn more about our {division.toLowerCase()} initiatives.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center opacity-70 text-sm">
        © {new Date().getFullYear()} WE Global Holding Inc. All rights reserved.
      </footer>
    </main>
  );
}
