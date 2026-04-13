import Link from 'next/link';

export default function CarpetCleaning() {
  const healthStats = [
    { stat: "200,000", label: "Dust mites per oz of carpet dust", source: "American Lung Association" },
    { stat: "4,000×", label: "More bacteria than a toilet seat", source: "NYU Microbiologist" },
    { stat: "68%", label: "Re-soil within 2 weeks of traditional cleaning", source: "Carpet & Rug Institute" },
    { stat: "80%", label: "Of home allergens live in soft surfaces", source: "U.S. EPA" },
    { stat: "4–6hr", label: "RF™ dry time vs 24–48hr traditional", source: "Tropical Breeze RF™" },
    { stat: "3×", label: "Longer clean with RF™ vs traditional", source: "Tropical Breeze RF™" },
  ];

  const process = [
    { step: "01", name: "Pure Flow Mark™", desc: "pH-balanced pre-spray breaks down soil and old residue — applied 5–10 min before extraction", chemistry: "pH 8.5–9.0 alkaline" },
    { step: "02", name: "Residue Break™", desc: "200°F hot water extraction at 1,200+ PSI reaches deep fiber contamination invisible to pre-inspection", chemistry: "200°F · 1,200+ PSI" },
    { step: "03", name: "Zero Trace Seal™", desc: "Neutralizing rinse binds to remaining surfactant molecules and encapsulates them for removal", chemistry: "pH 6.5–7.0 neutral rinse" },
    { step: "04", name: "Clean Wake™", desc: "pH meter verification confirms fibers at neutral 6.8–7.2 — UV light inspection for biological contamination", chemistry: "pH verified" },
    { step: "05", name: "Clear Path Icon™", desc: "Low-moisture extraction + airflow = dry in 4–6 hours. No residue means no dirt trapping during drying", chemistry: "4–6 hour dry time" },
  ];

  const faqs = [
    { q: "How much does carpet cleaning cost?", a: "RF99™ starts at $99 for the first room (up to 200 sq ft) plus a free deodorizing treatment OR carpet protector. Additional rooms are $50 each. Call 443-856-3244 for a full home quote." },
    { q: "How long does carpet cleaning take?", a: "Most rooms take 20–40 minutes. A full home is typically 2–4 hours depending on size and condition." },
    { q: "How long until I can walk on the carpet?", a: "With RF™, carpets are walk-ready in 4–6 hours. Traditional cleaning requires 24–48 hours because residue keeps fibers wet and sticky." },
    { q: "Is it safe for pets and children?", a: "Yes — completely. The RF™ process removes all cleaning agents from fibers. Safe immediately after drying." },
    { q: "Do you move furniture?", a: "We move light furniture at no charge. Heavy furniture requires a small additional fee. We always replace furniture on protective pads after cleaning." },
    { q: "What is the RF™ difference vs Stanley Steemer or Oxi Fresh?", a: "Both use traditional hot water extraction with detergent — leaving residue that attracts new dirt within 2 weeks. RF™ adds a neutralization step that removes the cleaning agent itself, keeping carpets cleaner 3× longer." },
    { q: "Do you serve my city?", a: "We serve 33+ cities across Maryland and Delaware's Eastern Shore. Call 443-856-3244 to confirm availability." },
  ];

  const cities = ["Salisbury MD", "Ocean City MD", "Berlin MD", "Ocean Pines MD", "Cambridge MD", "Easton MD", "Rehoboth Beach DE", "Bethany Beach DE", "Lewes DE", "The Peninsula DE", "Bayside DE"];

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40L48,37.3C96,35,192,29,288,32C384,35,480,45,576,48C672,51,768,45,864,40C960,35,1056,29,1152,32C1248,35,1344,45,1392,49.3L1440,53L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse inline-block" />
            Tropical Breeze RF™ · Carpet Cleaning
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:'clamp(40px,7vw,88px)'}}>
            RESIDUE-FREE<br /><span className="text-teal-300">CARPET CLEANING</span><br />THAT LASTS.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            Most carpet cleaners leave behind soap residue that attracts new dirt within days. Our RF™ process removes the dirt <strong className="text-white">AND</strong> the residue — so your carpets stay cleaner up to <strong className="text-teal-300">3× longer.</strong>
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book RF™ Carpet Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {[{n:"$99",l:"First Room RF99™"},{n:"3×",l:"Longer Clean"},{n:"4–6hr",l:"Dry Time"},{n:"365+",l:"5-Star Reviews"}].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          {/* RF99 CARD */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 w-72 shadow-2xl border border-orange-400 border-opacity-30">
              <div className="text-white text-xs font-bold tracking-widest uppercase mb-4 opacity-80">🌸 Spring Offer</div>
              <div className="text-white font-black leading-none mb-2" style={{fontSize:'48px'}}>RF99™</div>
              <div className="text-orange-100 font-bold text-xl mb-4">Starter Pack</div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-white text-sm"><span>✅</span> First room up to 200 sq ft</div>
                <div className="flex items-center gap-2 text-white text-sm"><span>✅</span> Deodorizing treatment</div>
                <div className="flex items-center gap-2 text-white text-sm"><span>✅</span> OR carpet protector</div>
                <div className="flex items-center gap-2 text-white text-sm"><span>✅</span> 4–6 hour dry time</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-1">$99</div>
                <div className="text-orange-200 text-xs mb-4">Ends April 30, 2026</div>
                <Link href="/booking" className="block bg-white text-orange-600 font-black px-6 py-3 rounded-full hover:bg-orange-50 transition text-center">
                  Book RF99™ Now →
                </Link>
              </div>
            </div>
          </div>

        </div>
        </div>
      </section>
      {/* RF99 OFFER */}
      <section className="py-16 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-2">🌸 Spring Offer — Ends April 30</p>
            <h2 className="font-black text-white text-4xl">RF99™ — First Room $99</h2>
            <p className="text-orange-100 mt-2">One room up to 200 sq ft + deodorizing treatment OR carpet protector. Zero residue. Zero re-soiling.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/booking" className="bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:bg-orange-50 transition text-lg">Book Online →</Link>
            <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-6 py-4 rounded-full hover:bg-orange-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">The Hidden Problem</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:'clamp(32px,4vw,56px)'}}>
                WHY YOUR CARPETS<br /><span className="text-teal-600">GET DIRTY AGAIN SO FAST</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">Traditional carpet cleaning uses detergents to lift soil. The detergent removes the dirt — but it stays in the fiber itself. That sticky residue acts like a magnet for new dirt.</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">Result: carpets that look clean for 10–14 days, then look worse than before you paid to have them cleaned.</p>
              <Link href="/residue-free" className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 font-bold px-6 py-3 rounded-full hover:bg-teal-100 transition">
                🔬 Read the full science of residue-free cleaning →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: "❌", color: "red", title: "Traditional Cleaning", items: ["Leaves soap residue deep in carpet fibers","Residue acts like a magnet for new dirt","Carpets re-soil within 2 weeks","Wet carpets for 24–48 hours","Fibers feel stiff or sticky after drying"] },
                { icon: "✅", color: "teal", title: "RF™ Cleaning", items: ["Removes dirt AND residue completely","Nothing left behind to attract new dirt","Stays cleaner up to 3× longer","Dry in 4–6 hours","Fibers feel soft and natural"] },
              ].map((card) => (
                <div key={card.title} className={`p-6 rounded-2xl border ${card.color === 'red' ? 'bg-red-50 border-red-100' : 'bg-teal-50 border-teal-200'}`}>
                  <h3 className={`font-black text-lg mb-4 ${card.color === 'red' ? 'text-red-700' : 'text-teal-700'}`}>{card.icon} {card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map(item => (
                      <li key={item} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className={card.color === 'red' ? 'text-red-400' : 'text-teal-500'}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* BEFORE & AFTER GALLERY */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Real Results</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              PROCHEM + ROTOVAC.<br /><span className="text-teal-600">REAL RESULTS.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Professional Prochem truckmount with Rotovac Powerwand 360 in action. 300-500 PSI. 200F+. Zero residue.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img src="/images/carpet-during-1.jpg" alt="Carpet cleaning in progress with Prochem truckmount and Rotovac wand" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-xs font-bold">Rotovac Powerwand 360 in action</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img src="/images/carpet-during-2.jpg" alt="RF carpet cleaning process showing half cleaned half dirty comparison" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-xs font-bold">300-500 PSI extraction</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img src="/images/carpet-after.jpg" alt="Carpet after RF cleaning — clean fluffy restored fibers" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-xs font-bold">Zero residue. Dry in 4-6 hours.</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 text-center mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="font-black text-teal-700 text-3xl">300-500</div>
                <div className="text-teal-600 text-sm font-semibold mt-1">PSI for Carpet</div>
              </div>
              <div>
                <div className="font-black text-teal-700 text-3xl">200F+</div>
                <div className="text-teal-600 text-sm font-semibold mt-1">Heat Extraction</div>
              </div>
              <div>
                <div className="font-black text-teal-700 text-3xl">4-6hr</div>
                <div className="text-teal-600 text-sm font-semibold mt-1">Dry Time</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              🧼 Book RF99 Carpet Cleaning
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">The RF™ Process</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:'clamp(32px,4vw,56px)'}}>
              FIVE STEPS.<br /><span className="text-teal-600">ZERO RESIDUE.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {process.map((p) => (
              <div key={p.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-6 items-start hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  {p.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-black text-[#0a1628] text-lg">{p.name}</h3>
                    <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{p.chemistry}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTH DATA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">The Health Case</span>
            <h2 className="font-black text-white leading-none" style={{fontSize:'clamp(32px,4vw,56px)'}}>
              WHAT'S LIVING IN<br /><span className="text-teal-300">YOUR CARPET RIGHT NOW</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {healthStats.map((h) => (
              <Link key={h.stat} href="/residue-free" className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8 text-center hover:bg-opacity-10 hover:-translate-y-1 transition-all backdrop-blur-sm block group">
                <div className="font-black text-teal-300 leading-none mb-3" style={{fontSize:'clamp(32px,5vw,52px)'}}>{h.stat}</div>
                <div className="text-white font-bold text-sm mb-2">{h.label}</div>
                <div className="text-sky-400 text-xs italic mb-3">{h.source}</div>
                <div className="text-teal-300 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Learn more →</div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/residue-free" className="inline-flex items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-20 transition">
              🔬 Read the Full Residue-Free Science Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:'clamp(32px,4vw,56px)'}}>
              CARPET CLEANING<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
                <h3 className="font-black text-[#0a1628] text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-4">Carpet Cleaning Across the Eastern Shore</h2>
          <p className="text-gray-500 mb-8">Every city. Same RF™ standard.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {cities.map((city) => (
              <Link key={city} href={`/services/carpet-cleaning/${city.toLowerCase().replace(/\s+/g,'-')}`}
                className="bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                {city}
              </Link>
            ))}
            <Link href="/booking" className="bg-teal-600 text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-teal-700 transition">
              + 22 More Cities →
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-8">Other RF™ Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {name:"Upholstery Cleaning",href:"/upholstery",icon:"🛋️"},
              {name:"Tile & Grout",href:"/tile-grout",icon:"⬜"},
              {name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},
              {name:"Window Cleaning",href:"/windows",icon:"🪟"},
              {name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"},
            ].map((s) => (
              <Link key={s.name} href={s.href} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:'clamp(36px,5vw,72px)'}}>
            READY FOR RF™<br /><span className="text-orange-400">CLEAN CARPETS?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Doesn't Survive Here™ · Serving 33+ cities across MD & DE</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book Online — Get Instant Quote
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-xl px-10 py-6 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}