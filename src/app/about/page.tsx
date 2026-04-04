import Link from "next/link";

export default function About() {
  const timeline = [
    { year: "2020", event: "Founded in Salisbury, MD as Tropical Breeze Carpet Cleaning — one van, one mission" },
    { year: "2021", event: "Expanded to Ocean City and Delaware beach communities" },
    { year: "2022", event: "Developed the RF™ Residue-Free process after observing systematic re-soiling in traditional cleaning" },
    { year: "2023", event: "Reached 33+ cities across the Eastern Shore — added windows, tile, hardwood, EZ Breeze" },
    { year: "2024", event: "Surpassed 200 five-star reviews — ranked between Stanley Steemer and Oxi Fresh on Google" },
    { year: "2026", event: "Rebranded as Tropical Breeze RF™ — the RF™ Standard becomes our public promise" },
  ];

  const values = [
    { icon: "🔬", name: "Science Over Shortcuts", desc: "Every process we use is pH-verified and chemically sound. We do not guess — we measure." },
    { icon: "🌊", name: "Eastern Shore Expertise", desc: "Salt air, high humidity, iron-rich water, coastal homes — we built our processes around this specific environment." },
    { icon: "🛡️", name: "Honest Assessment", desc: "We turn down jobs where we cannot deliver the result you expect. Your floor is more important than our invoice." },
    { icon: "⚡", name: "Speed Without Sacrifice", desc: "4-6 hour dry times are the result of doing the process right. Fast and thorough are not opposites." },
    { icon: "📊", name: "Measurable Results", desc: "We verify pH after every job. Zero residue is not a marketing claim — it is a reading on a meter." },
    { icon: "🤝", name: "Long-Term Relationships", desc: "365+ five-star reviews do not come from one-time customers. They come from homeowners who call us back every year." },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40L48,37.3C96,35,192,29,288,32C384,35,480,45,576,48C672,51,768,45,864,40C960,35,1056,29,1152,32C1248,35,1344,45,1392,49.3L1440,53L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            🌊 Our Story
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            BUILT ON THE<br /><span className="text-teal-300">EASTERN SHORE.</span><br />BUILT ON RF™.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto">
            Tropical Breeze RF™ started as a carpet cleaning company and grew into Maryland and Delaware's only certified Residue-Free cleaning service.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">How It Started</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(32px,4vw,56px)"}}>
                FROM CARPET CLEANING<br /><span className="text-teal-600">TO RF™</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We started serving families across Salisbury, MD with one mission — clean homes that actually stay clean. But we kept seeing the same problem: carpets that looked clean after traditional cleaning were dirty again within two weeks.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The culprit was soap residue. Traditional cleaning leaves it behind. It acts like a magnet for new dirt. We were not okay with that.
              </p>
              <p className="text-gray-800 font-bold text-lg leading-relaxed">
                So we developed the RF™ process using our Prochem truck-mount system with Rotovac Powerwand 360 — Residue-Free cleaning that removes the dirt AND the residue. Carpets that stay cleaner up to 3x longer.
              </p>
              <div className="mt-8">
                <Link href="/residue-free" className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 font-bold px-6 py-3 rounded-full hover:bg-teal-100 transition">
                  🔬 Read the RF™ Science Guide →
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-8">The RF™ Timeline</h3>
              <div className="space-y-6 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-500 to-orange-400" />
                {timeline.map((item) => (
                  <div key={item.year} className="flex gap-6 relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0 relative z-10 shadow-md">
                      {item.year.slice(2)}
                    </div>
                    <div>
                      <div className="font-black text-teal-600 text-sm mb-1">{item.year}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Our Equipment</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              PROFESSIONAL GRADE<br /><span className="text-teal-600">EVERY JOB</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-2">Rotovac Powerwand 360</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Standard wands only clean in two directions. Our Rotovac Powerwand uses dual-rotary heads to deep-clean every fiber from 360 degrees, removing significantly more soil than traditional methods at 300-500 PSI for carpet.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-2">Prochem Truckmount</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The gold standard in hot water extraction. We deliver 200F+ heat directly from our truck to your door, instantly sanitizing and killing bacteria on contact. Combined with our RF™ neutralization process for zero residue results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">What We Stand For</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              HOW WE OPERATE<br /><span className="text-teal-600">EVERY DAY</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all group">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-3 group-hover:text-teal-700 transition-colors">{v.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{stat:"365+",label:"Five-Star Reviews"},{stat:"33+",label:"Cities Served"},{stat:"6+",label:"Years Experience"},{stat:"3x",label:"Longer Clean"}].map((s) => (
              <div key={s.stat} className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8">
                <div className="font-black text-teal-300 leading-none mb-2" style={{fontSize:"clamp(36px,5vw,56px)"}}>{s.stat}</div>
                <div className="text-sky-200 font-semibold text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-8">Every RF™ Service</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Upholstery",href:"/upholstery",icon:"🛋️"},{name:"Tile and Grout",href:"/tile-grout",icon:"⬜"},{name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},{name:"Window Cleaning",href:"/windows",icon:"🪟"},{name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"}].map((s) => (
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
            READY TO EXPERIENCE<br /><span className="text-orange-400">THE RF™ DIFFERENCE?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Serving 33+ cities across Maryland and Delaware's Eastern Shore</p>
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
