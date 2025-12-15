import { divisions } from '@/data/divisions';

export default function DivisionsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      {/* HEADER */}
      <section className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">Strategic Divisions</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Each division of WE Global Holding Inc. plays a strategic role in
          connecting markets, capital, technology, and opportunities across
          global industries.
        </p>
      </section>

      {/* DIVISIONS GRID */}
      <section className="grid md:grid-cols-2 gap-10">
        {divisions.map((division) => {
          const Icon = division.icon;

          return (
            <div key={division.id} className="glass-card p-8">
              {/* TITLE + ICON */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-black/5">
                  <Icon className="w-6 h-6 text-black" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">{division.title}</h2>
                  <p className="text-sm text-gray-600">{division.subtitle}</p>
                </div>
              </div>

              {/* DESCRIPTION */}
              {division.description.map((text, index) => (
                <p key={index} className="text-gray-800 leading-relaxed mb-3">
                  {text}
                </p>
              ))}

              {/* OPTIONAL LIST */}
              {division.list && (
                <ul className="list-disc list-inside text-gray-800 mt-4 space-y-1">
                  {division.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
