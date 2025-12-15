const divisions = [
  {
    title: 'Business Verification (Company Integration)',
    paragraphs: [
      'The first step to entering the WE ecosystem. We validate and certify the identity, reputation, and operational capacity of each company.',
      'This allows us to represent their brand with confidence, security, and legitimacy to our global network of clients, investors, and strategic partners.',
    ],
  },
  {
    title: 'Auto-Match (Automatic Connection with Verified Dealers)',
    paragraphs: [
      'An intelligent system that connects users with trustworthy dealers to find their ideal vehicle, with better options and complete security.',
      'All companies within Auto-Match are verified by WE Global Holding Inc. to guarantee transparency, credibility, and trust.',
    ],
  },
  {
    title: 'Networking Platform for Property Closings',
    paragraphs: [
      'WE Global Holding Inc. acts as a strategic facilitator, connecting buyers, sellers, and investors within our network.',
      'All negotiations and closings are the sole responsibility of the participating parties. WE does not act as a broker, agent, or legal representative.',
    ],
  },
  {
    title: 'Global Logistics (Trucks, Hotshots, Freight, and Containers)',
    paragraphs: [
      'We connect logistics companies with partner businesses seeking improved operational efficiency.',
      'Our validated network provides immediate opportunities to optimize routes, costs, and cargo flow through reliable and verified partners.',
    ],
  },
  {
    title: 'Franchises and Commercial Expansion',
    paragraphs: [
      'We help high-potential brands by connecting them with investors ready to expand their operations.',
      'Companies can access structured and accelerated growth through our global network of capital, experts, and markets.',
    ],
  },
  {
    title: 'Exclusive In-House Products',
    paragraphs: [
      'WE Global Holding Inc. currently has two innovations ready to launch in 2026:',
    ],
    list: ['Tri-Functional Deodorant', 'Instant Portable Bathroom Neutralizer'],
  },
  {
    title: 'Jet Line (Private Air Travel – Empty Leg)',
    paragraphs: [
      'Jet Line allows users to access private flights at highly accessible prices through empty-leg opportunities.',
      'All aircraft and operators comply with official regulations and strict standards, making private flying accessible and secure.',
    ],
  },
  {
    title: 'Government Contracts and Infrastructure Projects',
    paragraphs: [
      'We connect companies with certified contractors, strategic allies, and real opportunities within infrastructure, technology, energy, and government projects.',
      'We create bridges that allow companies to scale, internationalize, and access high-value contracts in multiple countries.',
    ],
  },
];

const impactSection = {
  title: 'Impact and Growth Potential',
  paragraphs: [
    'Each of the five applications is built on highly monetizable business models, with clear opportunities for international expansion.',
    'Their purpose within the WE ecosystem is to move capital, connect markets, simplify processes, and create new opportunities worldwide.',
  ],
  list: [
    'First-year combined revenue (United States): Over $670 million',
    'Five-year combined revenue (global): Over $5.4 billion annually',
  ],
};

const commissionsSection = {
  title: 'High and Unlimited Commissions',
  list: [
    'Business connections',
    'Franchises',
    'Exclusive products',
    'Logistics projects',
    'Technological opportunities',
    'Government contracts',
    'Properties and investments',
    'International expansion',
  ],
};

const ecosystemSection = {
  title: 'Join the WE Global Holding Inc. Ecosystem',
  paragraphs: [
    'WE Global Holding Inc. offers more than a role—we offer a global growth vehicle designed for ambitious entrepreneurs and visionaries.',
    'We do not offer jobs. We offer real opportunities for those who want to build a better life and become part of a global ecosystem.',
  ],
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-24">
      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Strategic Divisions of the WE Global Holding Inc. Ecosystem
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          WE Global Holding Inc. is a diversified global ecosystem designed to
          connect companies, capital, technology, and opportunities across
          multiple industries.
        </p>
      </section>

      {/* DIVISIONS */}
      <section className="space-y-10">
        {divisions.map((item) => (
          <div key={item.title} className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            {item.paragraphs?.map((text, i) => (
              <p key={i} className="text-gray-800 leading-relaxed mb-3">
                {text}
              </p>
            ))}

            {item.list && (
              <ul className="list-disc list-inside text-gray-800 mt-4 space-y-1">
                {item.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* IMPACT */}
      <section className="glass-card p-10">
        <h2 className="text-3xl font-bold mb-6">{impactSection.title}</h2>

        {impactSection.paragraphs.map((p) => (
          <p key={p} className="text-gray-800 leading-relaxed mb-4">
            {p}
          </p>
        ))}

        <ul className="list-disc list-inside text-gray-800 space-y-2">
          {impactSection.list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      </section>

      {/* COMMISSIONS */}
      <section className="glass-card p-10">
        <h2 className="text-3xl font-bold mb-6">{commissionsSection.title}</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          {commissionsSection.list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      </section>

      {/* JOIN */}
      <section className="glass-card p-10">
        <h2 className="text-3xl font-bold mb-6">{ecosystemSection.title}</h2>

        {ecosystemSection.paragraphs.map((p) => (
          <p key={p} className="text-gray-800 leading-relaxed mb-4">
            {p}
          </p>
        ))}
      </section>
    </main>
  );
}
