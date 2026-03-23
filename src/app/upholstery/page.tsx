export default function Upholstery() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Tropical Breeze RF™ · Upholstery Cleaning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Residue-Free Upholstery Cleaning for Sofas, Chairs & More</h1>
          <p className="text-xl text-sky-100 mb-8">Your sofa has 12x more bacteria than a toilet seat. Our RF™ fiber-aware process deep cleans without leaving sticky residue behind.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">Book Upholstery Cleaning</a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">Call 443-856-3244</a>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">What We Clean</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Sofas & Sectionals", "Loveseats", "Recliners", "Dining Chairs", "Ottomans", "Headboards", "Accent Chairs", "Futons", "Pet Furniture"].map((item) => (
              <div key={item} className="bg-white border border-sky-100 rounded-xl p-4 text-center text-sky-900 font-medium shadow-sm">
                🛋️ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Upholstery Cleaning FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "How long does upholstery cleaning take?", a: "Most pieces take 30-60 minutes. A full sectional may take up to 90 minutes." },
              { q: "How long to dry?", a: "Most upholstery dries in 2-4 hours with our RF™ low-moisture process." },
              { q: "Is it safe for all fabrics?", a: "We inspect every piece before cleaning and select the right process for each fabric type — microfiber, velvet, linen, leather-safe options available." },
              { q: "Can you remove pet odors?", a: "Yes — our enzyme treatment combined with RF™ cleaning eliminates odor-causing bacteria, not just the smell." },
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
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ Clean Upholstery?</h2>
        <p className="text-sky-200 mb-8">From $50 per piece · Serving 33+ cities across MD & DE</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}