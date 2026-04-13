import Link from "next/link";

export default function TileGrout() {
  const problems = [
    { icon: "🟠", title: "Orange Sprinkler Stains", detail: "Iron and manganese in Eastern Shore irrigation water oxidizes on grout, leaving permanent-looking orange staining. Our mineral-specific treatment breaks these down completely.", severity: "Most Common" },
    { icon: "⬛", title: "Dark or Black Grout Lines", detail: "Years of foot traffic and cleaning product buildup pack into grout pores. Our 1,200+ PSI rotary extraction reaches deeper than any mop or scrub brush.", severity: "Very Common" },
    { icon: "🦠", title: "Mold and Mildew in Grout", detail: "High humidity on the Eastern Shore makes bathroom and kitchen grout a prime breeding ground. Our anti-microbial treatment eliminates spores and protects against regrowth.", severity: "Common Coastal" },
    { icon: "💧", title: "Calcium and Hard Water Deposits", detail: "White or gray mineral deposits on tile surfaces — especially around faucets and showers. Dissolved with acid-based mineral treatment before extraction.", severity: "Very Common" },
    { icon: "🧴", title: "Cleaning Product Buildup", detail: "Years of mopping with soap leaves a waxy residue film on tile that attracts soil and makes floors look dirty even right after mopping.", severity: "Universal" },
    { icon: "🏊", title: "Pool Deck and Outdoor Tile", detail: "Pool chemicals, salt air, and UV exposure create unique staining on outdoor tile. We clean pool decks, patios, and outdoor tile using surface-specific processes.", severity: "Coastal Properties" },
  ];

  const faqs = [
    { q: "How much does tile and grout cleaning cost?", a: "$125 per room — includes tile surface cleaning, grout deep extraction, and a final rinse. Grout sealing is available as an add-on. Call 443-856-3244 for a free estimate." },
    { q: "Can you remove orange staining from grout?", a: "Yes — orange iron staining from irrigation water is our Eastern Shore specialty. We use a mineral-specific iron treatment that breaks down the iron oxide before extraction." },
    { q: "Do you seal grout after cleaning?", a: "Yes — professional grout sealing is available as an add-on after cleaning. Sealed grout resists staining for 2-3 years and is much easier to maintain." },
    { q: "Can you restore tile without replacing it?", a: "In most cases yes. Tile that appears permanently stained often responds completely to deep extraction and mineral treatment." },
    { q: "How long does tile and grout cleaning take?", a: "Most rooms take 1-2 hours. Heavy staining or addition of sealing service adds time." },
    { q: "What PSI do you use for tile cleaning?", a: "Up to 1,200+ PSI through a rotary extraction head — this reaches deep into grout pores that scrubbing can never access. This is appropriate for tile and grout — not carpet." },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40L48,37.3C96,35,192,29,288,32C384,35,480,45,576,48C672,51,768,45,864,40C960,35,1056,29,1152,32C1248,35,1344,45,1392,49.3L1440,53L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse inline-block" />
            Tropical Breeze RF™ · Tile and Grout
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            TILE AND GROUT<br /><span className="text-teal-300">RESTORATION</span><br />THAT LASTS.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            Up to 1,200+ PSI rotary extraction removes years of buildup from grout lines. Orange sprinkler stains, hard water deposits, mold — our Eastern Shore specialty. Results that look like replacement without the cost.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              Book Tile and Grout Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {[{n:"$125",l:"Per Room"},{n:"1,200+",l:"PSI Max"},{n:"🟠",l:"Iron Stain Experts"},{n:"365+",l:"5-Star Reviews"}].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Eastern Shore Specialists</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              EVERY PROBLEM.<br /><span className="text-teal-600">ONE SOLUTION.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all group">
                <div className="text-4xl mb-4">{p.icon}</div>
                <div className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">{p.severity}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-2 group-hover:text-teal-700 transition-colors">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* BEFORE & AFTER GALLERY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Real Results</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              BEFORE AND AFTER.<br /><span className="text-teal-600">THE RF™ DIFFERENCE.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Real jobs on the Eastern Shore. Every result verified with pH meter after cleaning.</p>
          </div>

          {/* SET 1 - White Bathroom */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">⬜ White Bathroom Tile — Grout Restoration</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-before-white-bathroom-1.jpg" alt="White bathroom tile before RF cleaning — dirty grout lines" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-after-white-bathroom.jpg" alt="White bathroom tile after RF cleaning — bright clean grout" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          {/* SET 2 - Bathroom White 2 */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">🚿 Bathroom Tile — Color Seal Restoration</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-before-white-2.jpg" alt="Bathroom tile before cleaning — tan stained grout" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-after-white-2.jpg" alt="Bathroom tile after RF cleaning — bright white grout lines" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          {/* SET 3 - Tan Bathroom Hotel */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">🏨 Vacation Rental Bathroom — Deep Extraction</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-before-tan.jpg" alt="Hotel bathroom tile before RF cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-during-tan.jpg" alt="Hotel bathroom tile during RF cleaning process" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-after-tan.jpg" alt="Hotel bathroom tile after RF cleaning — spotless" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          {/* SET 4 - Kitchen */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">🍳 Kitchen Slate Tile — Grout Deep Clean</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-before-kitchen.jpg" alt="Kitchen slate tile before RF cleaning — orange grout" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-after-kitchen.jpg" alt="Kitchen slate tile after RF cleaning — clean grey grout" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          {/* SET 5 - Entryway */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">🚪 Entryway Tile — Color Seal Transformation</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-before-entryway.jpg" alt="Entryway tile before RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/tile-after-entryway.jpg" alt="Entryway tile after RF cleaning — bright white grout" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              🌴 Get These Results — Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              TILE AND GROUT<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
                <h3 className="font-black text-[#0a1628] text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-8">Other RF™ Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Upholstery",href:"/upholstery",icon:"🛋️"},{name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},{name:"Window Cleaning",href:"/windows",icon:"🪟"},{name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"}].map((s) => (
              <Link key={s.name} href={s.href} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,72px)"}}>
            READY TO RESTORE<br /><span className="text-orange-400">YOUR TILE AND GROUT?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">$125 per room · Free estimate · Serving 33+ cities across MD and DE</p>
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
