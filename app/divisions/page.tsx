export default function DivisionsPage() {
  const divisions = [
    {
      slug: 'marketplace',
      title: 'Marketplace',
      description:
        'Plataforma que conecta empresas, productos y servicios dentro del ecosistema WE Global.',
    },
    {
      slug: 'connect',
      title: 'Connect',
      description:
        'Red de conexiones estratégicas entre empresas, inversores, aliados y oportunidades globales.',
    },
    {
      slug: 'verified',
      title: 'Verified',
      description:
        'Verificación de empresas, identidades y documentos para generar confianza dentro del ecosistema.',
    },
    {
      slug: 'services',
      title: 'Services',
      description:
        'Servicios corporativos, operativos y de consultoría diseñados para apoyar el crecimiento global.',
    },
    {
      slug: 'investments-properties',
      title: 'Investments & Properties',
      description:
        'Gestión de inversiones y portafolios de propiedades estratégicas en mercados clave.',
    },
    {
      slug: 'franchising',
      title: 'Franchising',
      description:
        'Expansión de marcas mediante modelos de franquicia estructurados y escalables.',
    },
    {
      slug: 'technology',
      title: 'Technology',
      description:
        'Vista informativa de las plataformas, apps internas y stack tecnológico de WE Global.',
    },
    {
      slug: 'recruitment',
      title: 'Recruitment',
      description:
        'Soluciones de atracción de talento y reclutamiento global para empresas dentro de la red.',
    },
    {
      slug: 'events-network',
      title: 'Events Network',
      description:
        'Red de eventos, foros y encuentros estratégicos que conectan actores clave a nivel global.',
    },
  ];

  return (
    <main className="min-h-screen bg-dark-primary text-white px-8 md:px-20 lg:px-36 py-24">
      {/* HERO */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <h1 className="text-5xl font-bold mb-6">Divisions</h1>
        <p className="text-lg opacity-80 leading-relaxed">
          WE Global Holding Inc. está estructurada en divisiones estratégicas
          que organizan el ecosistema de inversión, servicios, tecnología y
          expansión.
        </p>
      </section>

      {/* GRID DE DIVISIONES */}
      <section className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        {divisions.map((item) => (
          <a
            key={item.slug}
            href={`/divisions/${item.slug}`}
            className="group block bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
            <p className="opacity-70 mb-6">{item.description}</p>
            <span className="text-accent-primary group-hover:underline">
              Learn more →
            </span>
          </a>
        ))}
      </section>

      {/* FOOTER */}
      <p className="text-center text-sm mt-24 opacity-40">
        © {new Date().getFullYear()} WE Global Holding Inc. All rights reserved.
      </p>
    </main>
  );
}
