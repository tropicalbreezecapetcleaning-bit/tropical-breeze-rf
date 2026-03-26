export default function Contact() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Tropical Breeze RF™</h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Serving 33+ cities across Maryland and Delaware's Eastern Shore. Call, text, or book online — we respond fast.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-sky-50 rounded-2xl p-8 text-center border border-sky-100">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-sky-900 text-lg mb-2">Call or Text</h3>
              <a href="tel:4438563244" className="text-teal-600 font-bold text-xl hover:text-teal-700 transition">
                443-856-3244
              </a>
              <p className="text-gray-500 text-sm mt-2">Mon–Sat 8am–6pm</p>
              <p className="text-gray-500 text-sm">Same-day available</p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8 text-center border border-sky-100">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold text-sky-900 text-lg mb-2">Email</h3>
              <a href="mailto:tropicalbreezecapetcleaning@gmail.com" className="text-teal-600 font-bold text-sm hover:text-teal-700 transition break-all">
                tropicalbreezecapetcleaning@gmail.com
              </a>
              <p className="text-gray-500 text-sm mt-2">We respond within 2 hours</p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8 text-center border border-sky-100">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold text-sky-900 text-lg mb-2">Based In</h3>
              <p className="text-teal-600 font-bold">Salisbury, MD</p>
              <p className="text-gray-500 text-sm mt-2">Serving 33+ cities</p>
              <p className="text-gray-500 text-sm">Maryland & Delaware</p>
            </div>
          </div>

          {/* BOOK CTA */}
          <div className="bg-teal-600 rounded-2xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-teal-100 text-lg mb-8">
              Get an instant quote and book online in 60 seconds. Seasonal discounts available through online booking only.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/booking" className="bg-white text-teal-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-50 transition">
                Book Online Now
              </a>
              <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-500 transition">
                Call 443-856-3244
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Our Service Area</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-sky-900 mb-4 text-lg">Maryland Cities</h3>
              <div className="flex flex-wrap gap-2">
                {["Salisbury", "Ocean City", "Berlin", "Ocean Pines", "Princess Anne", "Crisfield", "Snow Hill", "Pocomoke City", "Cambridge", "Easton", "St Michaels", "Fruitland", "Delmar", "Pittsville", "Parsonsburg", "Bishopville"].map((city) => (
                  <span key={city} className="bg-white border border-sky-200 text-sky-700 px-3 py-1 rounded-full text-sm">
                    {city} MD
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sky-900 mb-4 text-lg">Delaware Cities</h3>
              <div className="flex flex-wrap gap-2">
                {["Rehoboth Beach", "Bethany Beach", "Fenwick Island", "Lewes", "Milton", "Georgetown", "Seaford", "Milford", "The Peninsula", "Bayside", "Heritage Shores"].map((city) => (
                  <span key={city} className="bg-white border border-sky-200 text-sky-700 px-3 py-1 rounded-full text-sm">
                    {city} DE
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How do I book a cleaning?", a: "Book online at /booking for an instant quote and to schedule your appointment. You can also call or text 443-856-3244." },
              { q: "Do you offer same-day service?", a: "Yes — same-day service is often available when you call before 11am." },
              { q: "What areas do you serve?", a: "We serve 33+ cities across Maryland and Delaware's Eastern Shore — from Salisbury MD to Rehoboth Beach DE." },
              { q: "How much does carpet cleaning cost?", a: "RF99™ — first room $99 plus deodorizing treatment or carpet protector. Additional rooms $50 each." },
              { q: "Are you insured?", a: "Yes — Tropical Breeze RF™ is fully licensed and insured." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-sky-100 pb-6">
                <h3 className="font-bold text-sky-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}