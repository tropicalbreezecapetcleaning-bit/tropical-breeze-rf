export default function EzBreeze() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Tropical Breeze RF™ · EZ Breeze Cleaning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">EZ Breeze Enclosure Cleaning — The Right Process for the Right Panel</h1>
          <p className="text-xl text-sky-100 mb-8">EZ Breeze vinyl panels are not glass — they scratch easily and yellow with the wrong cleaner. We inspect every panel, track, frame, and screen before touching anything.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">Book EZ Breeze Consultation</a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">Call 443-856-3244</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Why EZ Breeze Needs Special Care</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚠️", title: "Not Glass", desc: "EZ Breeze panels are vinyl — standard glass cleaners scratch and yellow them permanently." },
              { icon: "🌊", title: "Eastern Shore Conditions", desc: "Salt air, pollen, and humidity create unique buildup on EZ Breeze panels that requires a specific approach." },
              { icon: "🔍", title: "Inspection First", desc: "We assess panel condition, track alignment, and screen integrity before selecting the right cleaning process." },
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
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">What We Clean</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Vinyl Panels", "Aluminum Frames", "Tracks & Channels", "Screens", "Door Panels", "Corner Seals"].map((item) => (
              <div key={item} className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center text-sky-900 font-medium">
                🌴 {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">EZ Breeze FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "What makes EZ Breeze different from regular windows?", a: "EZ Breeze panels are made from vinyl, not glass. They require pH-neutral cleaners and soft application methods — standard glass cleaners cause scratching and yellowing." },
              { q: "How often should EZ Breeze be cleaned?", a: "On the Eastern Shore we recommend cleaning 2-3 times per year — spring, mid-summer, and fall — due to pollen, salt air, and humidity buildup." },
              { q: "Can you restore yellowed panels?", a: "In many cases yes — oxidation and yellowing can be reduced with our vinyl restoration treatment. We assess each panel during the consultation." },
              { q: "Do you serve golf communities?", a: "Golf community EZ Breeze cleaning is one of our most popular services. Bay views and fairway panoramas deserve a clear, residue-free panel every time." },
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
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ EZ Breeze Cleaning?</h2>
        <p className="text-sky-200 mb-8">Consultation-first approach · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Consultation</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}