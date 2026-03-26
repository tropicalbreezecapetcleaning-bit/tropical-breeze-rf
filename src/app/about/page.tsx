export default function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Built on the Eastern Shore.<br />Built on the RF™ Standard.
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Tropical Breeze RF™ started as a carpet cleaning company and grew into Maryland and Delaware's only certified Residue-Free cleaning service.
          </p>
        </div>
      </section>

      {/* THE STORY */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3">How It Started</p>
              <h2 className="text-3xl font-bold text-sky-900 mb-6">From Tropical Breeze Carpet Cleaning to RF™</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We started serving families across Salisbury, MD with one mission — clean homes that actually stay clean. But we kept seeing the same problem: carpets that looked clean after traditional cleaning were dirty again within two weeks.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The culprit was soap residue. Traditional cleaning leaves it behind. It acts like a magnet for new dirt. We weren't okay with that.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                So we developed the RF™ process — Residue-Free cleaning that removes the dirt AND the residue. Carpets that stay cleaner up to 3x longer. That became our standard for everything we touch.
              </p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  { year: "2020", event: "Founded in Salisbury, MD as Tropical Breeze Carpet Cleaning" },
                  { year: "2021", event: "Expanded to Ocean City and Delaware beach communities" },
                  { year: "2022", event: "Developed the RF™ Residue-Free process" },
                  { year: "2023", event: "Reached 33+ cities across the Eastern Shore" },
                  { year: "2024", event: "Surpassed 200 five-star reviews" },
                  { year: "2026", event: "Rebranded as Tropical Breeze RF™" },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4">
                    <span className="text-teal-500 font-mono font-bold text-sm w-12 flex-shrink-0 pt-1">{item.year}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE RF PROCESS */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3">What RF™ Means</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-4">Residue-Free Is Not a Tagline. It's a Standard.</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Every service we offer — carpet, upholstery, tile, hardwood, windows, EZ Breeze — is performed to the RF™ standard. Zero residue left behind. Every time.
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: "Pure Flow Mark™", desc: "pH-balanced solution breaks down dirt and old residue" },
              { name: "Residue Break™", desc: "200°F extraction at 1,200+ PSI removes everything" },
              { name: "Zero Trace Seal™", desc: "Neutralizes all pH — removes every soap molecule" },
              { name: "Clean Wake™", desc: "Final inspection confirms zero residue remains" },
              { name: "Clear Path Icon™", desc: "Walk-ready in 4-6 hours, not 24-48" },
            ].map((step, i) => (
              <div key={step.name} className="bg-white rounded-xl p-4 shadow-sm border border-sky-100">
                <div className="text-teal-500 font-mono text-xs mb-2">0{i + 1}</div>
                <div className="font-bold text-sky-900 text-sm mb-2">{step.name}</div>
                <div className="text-gray-500 text-xs">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* STATS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "200+", label: "Five-Star Reviews" },
              { stat: "33+", label: "Cities Served" },
              { stat: "6+", label: "Years Experience" },
              { stat: "3×", label: "Longer Clean" },
            ].map((s) => (
              <div key={s.stat} className="bg-sky-50 rounded-2xl p-6">
                <div className="text-4xl font-black text-teal-600 mb-2">{s.stat}</div>
                <div className="text-sky-900 font-medium text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the RF™ Difference?</h2>
        <p className="text-sky-200 mb-8 text-lg">Serving 33+ cities across Maryland and Delaware's Eastern Shore</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>

    </main>
  );
}
