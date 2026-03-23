export default function CarpetCleaning() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">
            Tropical Breeze RF™ · Carpet Cleaning
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Residue-Free Carpet Cleaning That Stays Clean 3x Longer
          </h1>
          <p className="text-xl text-sky-100 mb-8">
            Most carpet cleaners leave behind soap residue that attracts dirt within days. Our RF™ process removes the dirt AND the residue — so your carpets stay cleaner, longer.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">
              Book RF™ Carpet Cleaning
            </a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">
              Call 443-856-3244
            </a>
          </div>
        </div>
      </section>

      {/* RF99 OFFER */}
      <section className="py-12 px-6 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">RF99™ — First Room $99</h2>
        <p className="text-teal-100 mb-6 text-lg">One room up to 200 sq ft + deodorizing treatment OR carpet protector. No residue. No re-soiling.</p>
        <a href="tel:4438563244" className="bg-white text-teal-700 font-bold px-8 py-3 rounded-full hover:bg-teal-50 transition">
          Call to Book RF99™
        </a>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8">Why Your Carpets Get Dirty Again So Fast</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">❌ Traditional Cleaning</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Leaves soap residue deep in carpet fibers</li>
                <li>• Residue acts like a magnet for new dirt</li>
                <li>• Carpets re-soil within 2 weeks</li>
                <li>• Wet carpets for 24-48 hours</li>
                <li>• Fibers feel stiff or sticky after drying</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-4">✅ RF™ Cleaning</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Removes dirt AND residue completely</li>
                <li>• Nothing left behind to attract new dirt</li>
                <li>• Stays cleaner up to 3x longer</li>
                <li>• Dry in 4-6 hours</li>
                <li>• Fibers feel soft and natural</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3 text-center">The RF™ Process</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Five Steps. Zero Residue.</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "01", name: "Pure Flow Mark™", desc: "pH-balanced solution breaks down dirt and old residue" },
              { step: "02", name: "Residue Break™", desc: "200°F extraction at 1,200+ PSI removes everything" },
              { step: "03", name: "Zero Trace Seal™", desc: "Neutralizes all pH — removes every soap molecule" },
              { step: "04", name: "Clean Wake™", desc: "Final inspection confirms zero residue remains" },
              { step: "05", name: "Clear Path Icon™", desc: "Walk-ready in 4-6 hours, not 24-48" },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-4 text-center shadow-sm border border-sky-100">
                <div className="text-teal-500 font-mono text-sm mb-2">{s.step}</div>
                <div className="font-bold text-sky-900 text-sm mb-2">{s.name}</div>
                <div className="text-gray-500 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTH DATA */}
      <section className="py-16 px-6 bg-sky-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What's Living in Your Carpet Right Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { stat: "200,000", label: "Dust mites per ounce of carpet dust", source: "American Lung Association" },
              { stat: "4,000×", label: "More bacteria than a toilet seat", source: "NYU Microbiologist" },
              { stat: "68%", label: "Re-soil within 2 weeks of traditional cleaning", source: "Carpet & Rug Institute" },
              { stat: "80%", label: "Of home allergens live in soft surfaces", source: "EPA" },
              { stat: "4–6 hrs", label: "RF™ dry time vs 24-48hr traditional", source: "Tropical Breeze RF™" },
              { stat: "3×", label: "Longer clean with RF™ vs traditional", source: "Tropical Breeze RF™" },
            ].map((h) => (
              <div key={h.stat} className="text-center">
                <div className="text-3xl font-bold text-teal-300 mb-1">{h.stat}</div>
                <div className="text-sky-200 text-sm mb-1">{h.label}</div>
                <div className="text-sky-400 text-xs">{h.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Carpet Cleaning FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "How long does carpet cleaning take?", a: "Most rooms take 20-40 minutes. A full home typically takes 2-4 hours depending on size and condition." },
              { q: "How long until I can walk on the carpet?", a: "With our RF™ process, carpets are walk-ready in 4-6 hours. Traditional cleaning requires 24-48 hours." },
              { q: "Is it safe for pets and children?", a: "Yes — our RF™ process leaves zero chemical residue. No harsh fumes, no sticky aftermath. Safe immediately after drying." },
              { q: "What is the RF99™ offer?", a: "RF99™ is your first room cleaned for $99 — up to 200 sq ft — plus your choice of deodorizing treatment or carpet protector application." },
              { q: "Do you move furniture?", a: "We move light furniture (chairs, small tables, ottomans) at no charge. Heavy furniture can be moved for an additional fee." },
              { q: "What areas do you serve?", a: "We serve 33+ cities across Maryland and Delaware's Eastern Shore — from Salisbury MD to Rehoboth Beach DE." },
            ].map((f) => (
              <div key={f.q} className="border-b border-sky-100 pb-6">
                <h3 className="font-bold text-sky-900 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ Clean Carpets?</h2>
        <p className="text-sky-200 mb-8 text-lg">Residue Doesn't Survive Here™ · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">
            Book Online
          </a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">
            Call 443-856-3244
          </a>
        </div>
      </section>

    </main>
  );
}