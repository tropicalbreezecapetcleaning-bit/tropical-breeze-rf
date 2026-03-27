export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-sky-900 text-teal-300 text-xs font-mono py-2 overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-pulse px-8">
          ✦ Clean Wake™ ✦ Zero Trace Seal™ ✦ Pure Flow Mark™ ✦ Clear Path Icon™ ✦ Residue Break™ ✦ RF™ ✦ RF99™ ✦ Residue Doesn't Survive Here™
        </span>
      </div>
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-teal-700 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-4">RF™ Certified · Maryland & Delaware Eastern Shore</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">The residue-free cleaning company built to outlast ordinary clean.</h1>
          <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto">Tropical Breeze RF™ helps homes across Maryland and Delaware stay cleaner longer with a premium, residue-free process for carpet, upholstery, tile, hardwood, windows, and EZ Breeze enclosures.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online Now</a>
            <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16 text-center">
            <div><div className="text-3xl font-bold text-teal-300">200+</div><div className="text-sky-200 text-sm mt-1">Five-star reviews</div></div>
            <div><div className="text-3xl font-bold text-teal-300">4–6 hrs</div><div className="text-sky-200 text-sm mt-1">Fast-dry target</div></div>
            <div><div className="text-3xl font-bold text-teal-300">33+ Cities</div><div className="text-sky-200 text-sm mt-1">Eastern Shore</div></div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3">Why people switch</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-12">Problem → Solution → Result</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-left"><div className="text-2xl mb-3">⚠️</div><h3 className="font-bold text-sky-900 mb-2">The Problem</h3><p className="text-gray-600">Soap residue attracts dirt and leaves fibers stiff or sticky after conventional cleaning.</p></div>
            <div className="text-left"><div className="text-2xl mb-3">🌀</div><h3 className="font-bold text-sky-900 mb-2">The RF™ Solution</h3><p className="text-gray-600">Our RF™ process cleans, rinses, and lifts what others leave behind — zero residue remaining.</p></div>
            <div className="text-left"><div className="text-2xl mb-3">✅</div><h3 className="font-bold text-sky-900 mb-2">The Result</h3><p className="text-gray-600">Surfaces dry faster, feel better, and hold the clean up to 3x longer than traditional methods.</p></div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3 text-center">What we clean</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Six services. One residue-free standard.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "🧼", name: "Carpet Cleaning", desc: "Deep clean, zero residue, 3x longer clean.", price: "From $99" },
              { icon: "🛋️", name: "Upholstery Cleaning", desc: "Fiber-aware process for sofas and chairs.", price: "From $50+" },
              { icon: "⬜", name: "Tile & Grout", desc: "Removes stains, calcium, and dark grout lines.", price: "Free estimate" },
              { icon: "🪵", name: "Hardwood Cleaning", desc: "Inspection-first approach for every finish type.", price: "Inspection first" },
              { icon: "🪟", name: "Window Cleaning", desc: "Inside, outside, screens, tracks, and sills.", price: "$13/window" },
              { icon: "🌴", name: "EZ Breeze", desc: "Panels, tracks, frames — residue-free every time.", price: "Book consult" },
            ].map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-sky-900 mb-1">{s.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
                <span className="text-teal-600 text-sm font-semibold">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-900 text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3 text-center">Health data</p>
          <h2 className="text-3xl font-bold mb-10 text-center">What is actually living in your carpet right now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { stat: "200,000", label: "Dust mites in one ounce of carpet dust", source: "American Lung Association" },
              { stat: "4,000×", label: "More bacteria per sq inch vs a toilet seat", source: "NYU Microbiologist" },
              { stat: "68%", label: "Of homeowners report re-soiling within 2 weeks", source: "Carpet & Rug Institute" },
              { stat: "12×", label: "More bacteria on an uncleaned sofa vs toilet seat", source: "NSF International" },
              { stat: "80%", label: "Of common allergens live in soft surfaces", source: "EPA Indoor Air Quality" },
              { stat: "4–6 hrs", label: "RF™ dry time — wet carpet breeds mold", source: "Tropical Breeze RF™" },
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
      <section className="py-16 px-6 bg-teal-600 text-white text-center">
        <p className="text-teal-200 text-sm font-mono uppercase tracking-widest mb-2">Limited Offer</p>
        <h2 className="text-4xl font-bold mb-4">RF99™ — First Room $99</h2>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">Professional RF™ carpet cleaning for one room up to 200 sq ft — plus deodorizing treatment OR carpet protector.</p>
        <a href="tel:4438563244" className="bg-white text-teal-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-50 transition">Call 443-856-3244 to Book</a>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3 text-center">Service Area</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Serving 33+ cities across Maryland and Delaware</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-sky-900 mb-4 text-lg">Maryland Cities</h3>
              <div className="flex flex-wrap gap-2">
                {["Salisbury", "Ocean City", "Berlin", "Ocean Pines", "Princess Anne", "Crisfield", "Snow Hill", "Pocomoke City", "Cambridge", "Easton", "St Michaels", "Fruitland", "Delmar", "Pittsville", "Parsonsburg", "Bishopville"].map((city) => (
                  <a key={city} href={`/${city.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')}-md`} className="bg-sky-50 hover:bg-teal-50 border border-sky-200 text-sky-700 px-3 py-1 rounded-full text-sm transition">{city} MD</a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sky-900 mb-4 text-lg">Delaware Cities</h3>
              <div className="flex flex-wrap gap-2">
                {["Rehoboth Beach", "Bethany Beach", "Fenwick Island", "Lewes", "Milton", "Georgetown", "Seaford", "Milford"].map((city) => (
                  <a key={city} href={`/${city.toLowerCase().replace(/\s+/g, '-')}-de`} className="bg-sky-50 hover:bg-teal-50 border border-sky-200 text-sky-700 px-3 py-1 rounded-full text-sm transition">{city} DE</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to book?</h2>
        <p className="text-sky-200 mb-8 text-lg">Call, text, or click — we serve 33+ cities across the Eastern Shore.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
        <p className="text-sky-400 text-sm mt-8">Residue Doesn't Survive Here™ · tropicalbreezerf.com</p>
      </section>
      {/* REVIEWS */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-4xl mx-auto text-center">
    <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3">What Customers Say</p>
    <h2 className="text-3xl font-bold text-sky-900 mb-10">200+ Five-Star Reviews Across the Eastern Shore</h2>
    <div className="flex justify-center">
      <iframe 
        src="https://client.housecallpro.com/reviews/widget/org_50b68db028f14c63aac14e1697f85fa8" 
        height="600" 
        width="100%"
        style={{ border: 'none', maxWidth: '800px' }}
        title="Customer Reviews"
      />
    </div>
  </div>
</section>
    </main>
  );
}