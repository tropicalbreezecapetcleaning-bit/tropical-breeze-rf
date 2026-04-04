import Link from "next/link";

export default function Windows() {
  const included = [
    { icon: "🪟", item: "Interior glass — every pane", desc: "Cleaned from inside with streak-free pure water process" },
    { icon: "🌊", item: "Exterior glass — every pane", desc: "Purified water removes salt air, mineral deposits, and oxidation" },
    { icon: "🕸️", item: "Screens — cleaned and reinstalled", desc: "Removed, cleaned, dried, and reinstalled properly" },
    { icon: "🔩", item: "Tracks — vacuumed and wiped", desc: "Dirt, dead insects, and debris removed from all tracks" },
    { icon: "🪛", item: "Sills — wiped clean", desc: "Interior and exterior sills wiped down after glass cleaning" },
    { icon: "✅", item: "Final inspection — streak check", desc: "Every pane checked in natural light before we leave" },
  ];

  const faqs = [
    { q: "How much does window cleaning cost?", a: "$13 per window — includes inside glass, outside glass, screen cleaning, track cleaning, and sill wipe-down. No hidden fees." },
    { q: "What does $13 per window include?", a: "Everything: interior glass, exterior glass, screen removal and cleaning, track vacuuming and wiping, and sill wipe-down. No extra charges for screens or tracks." },
    { q: "Can you remove hard water stains and salt deposits?", a: "Yes — salt air mineral deposits and hard water staining are our Eastern Shore specialty. We use mineral-specific treatment to dissolve calcium, iron, and sodium deposits." },
    { q: "How often should I have windows cleaned?", a: "Ocean-facing homes: every 3-4 months. Inland homes: every 4-6 months. Vacation rentals benefit from cleaning between major guest turnovers." },
    { q: "Do you serve vacation rental properties?", a: "Yes — vacation rental window cleaning is one of our most requested services across Ocean City, Rehoboth, Bethany, Fenwick, and Lewes." },
    { q: "Do you clean high windows?", a: "Yes — we use water-fed pole systems for second-story and high windows, allowing us to clean safely from the ground." },
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
            Tropical Breeze RF™ · Window Cleaning
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            YOUR VIEW<br /><span className="text-teal-300">DESERVES</span><br />TO BE CLEAR.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            Pure water window cleaning that removes salt-air mineral deposits, hard water staining, and organic film. Inside + outside + screens + tracks + sills. All for <strong className="text-white">$13 per window.</strong>
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🪟 Book Window Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {[{n:"$13",l:"Per Window"},{n:"6",l:"Services Included"},{n:"0 TDS",l:"Pure Water"},{n:"365+",l:"5-Star Reviews"}].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-black text-4xl mb-2">$13 Per Window — Everything Included</h2>
          <p className="text-orange-100 text-lg">Inside + outside + screens + tracks + sills. No hidden fees.</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-white text-orange-600 font-black px-8 py-3 rounded-full hover:bg-orange-50 transition">Book Online →</Link>
            <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Everything Included at $13/Window</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              SIX SERVICES.<br /><span className="text-teal-600">ONE PRICE.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {included.map((item) => (
              <div key={item.item} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-2 group-hover:text-teal-700 transition-colors">{item.item}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">The Science</span>
            <h2 className="font-black text-white leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              WHY PURE WATER<br /><span className="text-teal-300">LEAVES NO STREAKS</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-sky-200 space-y-4 text-lg leading-relaxed">
              <p>Standard window cleaning uses soap or detergent that leaves a residue film attracting dust — causing windows to look dirty again within days.</p>
              <p>Pure water (0 TDS — Total Dissolved Solids) has no mineral content and no cleaning agents. When it dries on glass, it leaves nothing behind.</p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "💧", title: "0 TDS Pure Water", desc: "Filtered to remove all minerals — leaves zero residue when dry" },
                { icon: "🧲", title: "Pulls Minerals From Glass", desc: "Purified water aggressively attracts and lifts mineral deposits" },
                { icon: "✨", title: "Streak-Free Every Time", desc: "Nothing to leave behind means nothing to streak" },
                { icon: "🌊", title: "Salt Air Effective", desc: "Sodium and mineral deposits dissolve on contact with pure water" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-xl p-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-sky-300 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              WINDOW CLEANING<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
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

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-8">Other RF™ Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Upholstery",href:"/upholstery",icon:"🛋️"},{name:"Tile & Grout",href:"/tile-grout",icon:"⬜"},{name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},{name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"}].map((s) => (
              <Link key={s.name} href={s.href} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,72px)"}}>
            READY FOR<br /><span className="text-orange-400">CLEAR WINDOWS?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">$13 per window · Inside + outside + screens + tracks + sills · 33+ cities</p>
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
