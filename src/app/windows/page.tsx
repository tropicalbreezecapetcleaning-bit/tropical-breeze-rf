export default function Windows() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Tropical Breeze RF™ · Window Cleaning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Streak-Free Window Cleaning Inside & Out — $13 Per Window</h1>
          <p className="text-xl text-sky-100 mb-8">A good window clean is more than glass. We clean inside and outside, then handle screens, tracks, and sills — leaving nothing behind but a perfect view.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">Book Window Cleaning</a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">Call 443-856-3244</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">What's Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🪟", name: "Interior Glass", desc: "Streak-free inside clean" },
              { icon: "🌤️", name: "Exterior Glass", desc: "Streak-free outside clean" },
              { icon: "🔲", name: "Screens", desc: "Removed, cleaned, replaced" },
              { icon: "📐", name: "Tracks", desc: "Dirt and debris removed" },
              { icon: "🧹", name: "Sills", desc: "Wiped clean and dry" },
              { icon: "✅", name: "Final Inspection", desc: "Zero streaks guaranteed" },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-xl p-4 text-center shadow-sm border border-sky-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-sky-900 text-sm mb-1">{item.name}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
        <div className="text-6xl font-bold text-white mb-3">$13</div>
        <p className="text-teal-100 text-xl mb-2">per window</p>
        <p className="text-teal-200">Inside + outside + screens + tracks + sills</p>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Window Cleaning FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Do you clean both inside and outside?", a: "Yes — every window is cleaned inside and outside. We also clean screens, tracks, and sills as part of the standard service." },
              { q: "How long does window cleaning take?", a: "Most homes take 1-3 hours depending on the number of windows and accessibility." },
              { q: "Do you clean EZ Breeze enclosures?", a: "Yes — EZ Breeze panels require a specific process different from standard glass. See our EZ Breeze service page for details." },
              { q: "What about hard water stains?", a: "Hard water and mineral deposits from Eastern Shore water are common. We use a mineral treatment to remove these without scratching the glass." },
              { q: "Do you serve vacation rentals?", a: "Absolutely — window cleaning between guest turnovers is one of our most requested services, especially in beach communities." },
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
        <h2 className="text-3xl font-bold mb-4">Ready for Streak-Free Windows?</h2>
        <p className="text-sky-200 mb-8">$13 per window · Inside & out · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}