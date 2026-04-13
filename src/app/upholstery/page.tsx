import Link from 'next/link';

export default function Upholstery() {
  const healthStats = [
    { stat: "100K+", label: "Bacteria per sq inch on average sofa", source: "University of Arizona Study" },
    { stat: "7×", label: "More germs on your couch than a toilet seat", source: "Hygiene Council" },
    { stat: "12lbs", label: "Of dead skin shed per person per year — most lands on furniture", source: "American Academy of Dermatology" },
    { stat: "80%", label: "Of home allergens trapped in soft surfaces", source: "U.S. EPA" },
    { stat: "2–4hr", label: "RF™ dry time for most upholstery", source: "Tropical Breeze RF™" },
    { stat: "3×", label: "Longer clean with RF™ vs traditional", source: "Tropical Breeze RF™" },
  ];

  const faqs = [
    { q: "How much does upholstery cleaning cost?", a: "Chairs from $50 · Loveseats $75 · Sofas from $85 · Sectionals from $120. Pet odor enzyme treatment is an additional $25–$40. Call 443-856-3244 for a free estimate." },
    { q: "How long does upholstery cleaning take?", a: "Most single pieces take 30–60 minutes. A full sectional with pet treatment is typically 90–120 minutes." },
    { q: "Can you remove pet odor from my sofa?", a: "Yes — our enzyme treatment breaks down uric acid crystals in pet urine at the molecular level. This eliminates the odor permanently, not just masks it." },
    { q: "Is it safe for my fabric?", a: "We inspect every piece before cleaning and identify the fiber type. Each fabric receives the correct cleaning method — no guessing." },
    { q: "How long until I can sit on the furniture?", a: "Most upholstery is dry and ready to use in 2–4 hours. Leather and microfiber are often ready in 1–2 hours." },
    { q: "Do you clean outdoor furniture cushions?", a: "Yes — we clean outdoor cushions using a process appropriate for outdoor fabrics. Salt air and mold/mildew exposure are common on the Eastern Shore." },
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
            Tropical Breeze RF™ · Upholstery Cleaning
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            YOUR FURNITURE<br /><span className="text-teal-300">DESERVES</span><br />BETTER.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            Fiber-specific RF™ cleaning for every sofa, chair, and sectional. Pet odor enzyme treatment that eliminates — not masks. Safe for all fabrics. Dry in 2–4 hours.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🛋️ Book Upholstery Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {[{n:"$50",l:"Chairs from"},{n:"$85",l:"Sofas from"},{n:"2–4hr",l:"Dry Time"},{n:"365+",l:"5-Star Reviews"}].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-orange-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
            {[{item:"Chair",price:"$50"},{item:"Loveseat",price:"$75"},{item:"Sofa",price:"$85"},{item:"Sectional",price:"From $120"}].map(p => (
              <Link href="/booking" key={p.item} className="bg-[#b45309] rounded-2xl p-6 hover:bg-[#92400e] transition border border-white border-opacity-20 block">
                <div className="text-3xl font-black mb-1">{p.price}</div>
                <div className="text-white font-semibold text-sm">{p.item}</div>
                <div className="text-orange-200 text-xs mt-2">Book Online →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">Did You Know?</span>
          <h2 className="font-black text-white leading-none mb-16" style={{fontSize:"clamp(32px,4vw,56px)"}}>
            WHAT IS ON YOUR<br /><span className="text-teal-300">SOFA RIGHT NOW</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {healthStats.map((h) => (
              <Link href="/residue-free" key={h.stat} className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8 hover:bg-opacity-10 hover:-translate-y-1 transition-all block group">
                <div className="font-black text-teal-300 leading-none mb-3" style={{fontSize:"clamp(32px,5vw,52px)"}}>{h.stat}</div>
                <div className="text-white font-bold text-sm mb-2">{h.label}</div>
                <div className="text-sky-400 text-xs italic mb-3">{h.source}</div>
                <div className="text-teal-300 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* BEFORE & AFTER GALLERY */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Real Results</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              DINING CHAIRS.<br /><span className="text-teal-600">COMPLETELY RESTORED.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Set of dining chairs — stained fabric restored to like-new condition with RF™ upholstery cleaning.</p>
          </div>

          {/* BEFORE ROW */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-2 rounded-full mb-6">BEFORE — Stained dining chair fabric</div>
            <div className="grid md:grid-cols-3 gap-4">
              {["upholstery-before-1.jpg","upholstery-before-2.jpg","upholstery-before-3.jpg"].map((img,i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img src={`/images/${img}`} alt={`Dining chair upholstery before RF cleaning — chair ${i+1}`} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
                </div>
              ))}
            </div>
          </div>

          {/* DURING */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full mb-6">DURING — RF™ extraction in progress</div>
            <div className="grid md:grid-cols-1 gap-4 max-w-sm">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="/images/upholstery-during.jpg" alt="Upholstery cleaning in progress — RF extraction wand on chair" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              </div>
            </div>
          </div>

          {/* AFTER ROW */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">AFTER — Clean restored fabric</div>
            <div className="grid md:grid-cols-3 gap-4">
              {["upholstery-after-1.jpg","upholstery-after-2.jpg","upholstery-after-3.jpg"].map((img,i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img src={`/images/${img}`} alt={`Dining chair upholstery after RF cleaning — chair ${i+1}`} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              🛋️ Book Upholstery Cleaning
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-10">
            <div className="text-4xl mb-4">🐾</div>
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Pet Odor Treatment</span>
            <h2 className="font-black text-[#0a1628] text-3xl mb-6">Enzyme Treatment — Eliminates, Not Masks</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <p className="text-gray-600 leading-relaxed">Standard deodorizing sprays cover pet odor with a stronger scent. Our enzyme treatment contains biological enzymes that break down the uric acid crystals in pet urine at the molecular level — the source of the odor. Once broken down, the odor cannot return.</p>
              <div className="space-y-3">
                {["Breaks down uric acid crystals permanently","Safe for all pets immediately after drying","No harsh chemicals or perfume masking","Works on old and new stains","Available for carpet, upholstery, and area rugs"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <Link href="/booking" className="bg-teal-600 text-white font-black px-8 py-4 rounded-full hover:bg-teal-700 transition inline-flex items-center gap-2">
                🐾 Book Pet Odor Treatment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              UPHOLSTERY<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
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
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Tile & Grout",href:"/tile-grout",icon:"⬜"},{name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},{name:"Window Cleaning",href:"/windows",icon:"🪟"},{name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"}].map((s) => (
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
            READY FOR RF™<br /><span className="text-orange-400">CLEAN FURNITURE?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Doesnt Survive Here · Serving 33+ cities across MD and DE</p>
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
