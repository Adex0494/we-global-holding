export default function DivisionsPage() {
  const divisions = [
    {
      title: 'Marketplace',
      description:
        'A global marketplace platform connecting products, services, and opportunities.',
    },
    {
      title: 'Connect',
      description:
        'A smart system designed to link businesses, investors, and international partners.',
    },
    {
      title: 'Verified',
      description:
        'Our verification ecosystem for businesses, documents, and corporate identity.',
    },
    {
      title: 'Services',
      description:
        'Consulting, logistics, expansion, and strategic corporate solutions.',
    },
    {
      title: 'Investments & Properties',
      description:
        'Investment vehicles and international real estate opportunities.',
    },
    {
      title: 'Franchising',
      description:
        'A franchising system empowering global expansion through certified partners.',
    },
    {
      title: 'Technology',
      description:
        '(Informational only) Internal apps for automation, analytics, and operations.',
    },
    {
      title: 'Recruitment',
      description:
        'Connecting verified professionals with global markets and opportunities.',
    },
    {
      title: 'Events',
      description:
        'Corporate gatherings, international summits, and business conferences.',
    },
    {
      title: 'Network',
      description:
        'The global business community built around WE Global Holding Inc.',
    },
  ];

  return (
    <main className="min-h-screen px-8 md:px-20 lg:px-40 py-24 text-black">
      {/* ---- HERO ---- */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">Divisions</h1>
        <p className="text-lg opacity-80 max-w-3xl mx-auto">
          Explore the core sectors that power the WE Global Holding Inc.
          ecosystem across industries and international markets.
        </p>
      </section>

      {/* ---- DIVISIONS GRID ---- */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {divisions.map((item, i) => (
          <div
            key={i}
            className="glass-card p-8 rounded-2xl cursor-pointer transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-black/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
