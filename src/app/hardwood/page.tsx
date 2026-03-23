export default function Hardwood() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Tropical Breeze RF™ · Hardwood Floor Cleaning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Hardwood Floor Cleaning That Starts With Inspection — Not Assumptions</h1>
          <p className="text-xl text-sky-100 mb-8">Hardwood gets damaged when people use the wrong product on the wrong finish. We inspect first, identify your floor type, then clean with the exact process it needs.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">Book Hardwood Inspection</a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">Call 443-856-3244</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Why Inspection First Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Identify Finish Type", desc: "Polyurethane, oil-based, wax, or aluminum oxide — each requires a different cleaning approach." },
              { icon: "💧", title: "Moisture Assessment", desc: "Eastern Shore humidity can cause cupping and warping. We assess moisture levels before any cleaning." },
              { icon: "✅", title: "Right Process Every Time", desc: "Only after inspection do we select the exact solution and method for your specific floor." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-sky-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Hardwood Cleaning FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Can you clean all hardwood finishes?", a: "We clean polyurethane, oil-based, and aluminum oxide finishes. Wax finishes require special care — we identify these during inspection." },
              { q: "What about Eastern Shore humidity?", a: "High humidity is the #1 enemy of hardwood on the Eastern Shore. Our low-moisture RF™ process is specifically designed to clean effectively without adding damaging moisture." },
              { q: "Can you remove old wax buildup?", a: "Yes — wax buildup is one of our specialties. We use a safe stripping process that removes buildup without damaging the wood underneath." },
              { q: "How long does hardwood cleaning take?", a: "Most rooms take 30-60 minutes after inspection. The floor is ready to walk on within 1-2 hours." },
            ].map((f) => (
              <div key={f.q} className="border-b border-sky-100 pb-6">
                <h3 className="font-bold text-sky-900 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ Hardwood Cleaning?</h2>
        <p className="text-sky-200 mb-8">Inspection-first approach · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Inspection</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}