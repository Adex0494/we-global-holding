import {
  divisions,
  impactSection,
  commissionsSection,
  ecosystemSection,
} from '@/data/divisions';
import { GlassCard } from '@/components/ui';

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-24">
      {/* Hero */}
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

      {/* Divisions */}
      <section className="space-y-10">
        {divisions.map((item) => (
          <GlassCard key={item.id} enableHover={false}>
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-4">
                {item.title} ({item.subtitle})
              </h2>

              {item.description.map((text, i) => (
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
          </GlassCard>
        ))}
      </section>

      {/* Impact */}
      <GlassCard enableHover={false}>
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">{impactSection.title}</h2>

          {impactSection.paragraphs?.map((p) => (
            <p key={p} className="text-gray-800 leading-relaxed mb-4">
              {p}
            </p>
          ))}

          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {impactSection.list?.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        </div>
      </GlassCard>

      {/* Commissions */}
      <GlassCard enableHover={false}>
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">{commissionsSection.title}</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {commissionsSection.list?.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        </div>
      </GlassCard>

      {/* Join */}
      <GlassCard enableHover={false}>
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">{ecosystemSection.title}</h2>

          {ecosystemSection.paragraphs?.map((p) => (
            <p key={p} className="text-gray-800 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </GlassCard>
    </main>
  );
}
