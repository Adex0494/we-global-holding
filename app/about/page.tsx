export default function AboutPage() {
  const values = [
    {
      title: 'Impact and Growth Potential',
      text: 'Each of the five applications is built on highly monetizable business models with international expansion opportunities. Our verified projections show extraordinary financial potential even at 1% market penetration.',
    },
    {
      title: 'Confidentiality and Strategic Protection',
      text: 'All specifications and operational models are confidential. Access to detailed information requires signing an NDA to protect intellectual property and competitive advantage.',
    },
    {
      title: 'Join the WE Ecosystem',
      text: 'We offer real opportunities for entrepreneurs and visionaries. Our network connects companies, investors, products, technology, and global opportunities.',
    },
    {
      title: 'High and Unlimited Commissions',
      text: 'Representatives can generate income through business connections, franchises, logistics, government contracts, properties, tech opportunities, and more.',
    },
    {
      title: 'Growth That Changes Lives',
      text: 'WE democratizes opportunity with training, mentorship, digital tools, corporate backing, and access to verified companies. Growth is based on action.',
    },
    {
      title: 'A Global Ecosystem, A Professional Family',
      text: 'Every member joins an international network committed to collective success. Effort, ethics, and ambition define our culture.',
    },
    {
      title: 'Be Part of the Movement',
      text: 'Our selection process is strict. We don’t offer jobs—we offer global opportunities for those ready to grow and build real impact.',
    },
  ];

  return (
    <main className="min-h-screen px-8 md:px-20 lg:px-40 py-28 text-black">
      {/* ---- HERO ---- */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg opacity-80 leading-relaxed">
          WE Global Holding Inc. is a diversified investment and innovation firm
          focused on empowering global markets through technology, finance,
          infrastructure, and strategic partnerships.
        </p>
      </section>

      {/* ---- VALUES SECTION ---- */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Values</h2>

        <div className="grid gap-10 md:grid-cols-2">
          {values.map((item, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-black/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
