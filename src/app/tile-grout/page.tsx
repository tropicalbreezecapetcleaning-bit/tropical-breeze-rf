export default function TileGrout() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Tropical Breeze RF™ · Tile & Grout Cleaning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Tile & Grout Cleaning That Restores What Others Can't Touch</h1>
          <p className="text-xl text-sky-100 mb-8">Orange sprinkler stains. White calcium crust. Decade-old dark grout lines. The Eastern Shore's water and humidity create tile problems most cleaners won't attempt. We specialize in them.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">Get Free Estimate</a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">Call 443-856-3244</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">What We Restore</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Kitchen Floors", "Bathroom Tile", "Shower Walls", "Entryways", "Pool Decks", "Outdoor Tile", "Grout Restoration", "Calcium Removal", "Sprinkler Stain Removal"].map((item) => (
              <div key={item} className="bg-white border border-sky-100 rounded-xl p-4 text-center text-sky-900 font-medium shadow-sm">
                ⬜ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Tile & Grout FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Can you restore dark grout lines?", a: "Yes — our high-pressure extraction at 1,200+ PSI combined with our RF™ cleaning solution removes years of buildup from grout lines." },
              { q: "What about orange sprinkler stains?", a: "Orange staining from irrigation water is an Eastern Shore specialty of ours. Our mineral treatment breaks down iron deposits that regular cleaning can't touch." },
              { q: "Do you seal grout after cleaning?", a: "Yes — we offer professional grout sealing after cleaning to protect against future staining and moisture penetration." },
              { q: "How long does tile cleaning take?", a: "Most kitchens or bathrooms take 1-2 hours. Larger areas or heavily stained tile may take longer. We provide a free estimate first." },
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
        <h2 className="text-3xl font-bold mb-4">Ready to Restore Your Tile & Grout?</h2>
        <p className="text-sky-200 mb-8">Free estimates · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Get Free Estimate</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}