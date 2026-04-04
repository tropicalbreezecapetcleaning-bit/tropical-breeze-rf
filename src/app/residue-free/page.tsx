import Link from "next/link";

export default function ResidueFree() {
  const faqs = [
    { q: "What does residue-free cleaning mean?", a: "Residue-free cleaning means the cleaning process removes both the soil AND the cleaning agent itself from the surface. Traditional cleaning leaves behind soap or detergent residue that remains in the fiber — invisible but highly effective at attracting new dirt. The RF™ process uses a neutralization step that eliminates every cleaning molecule after it has done its job, leaving fibers chemically neutral." },
    { q: "Why does carpet get dirty faster after traditional cleaning?", a: "Traditional hot water extraction uses detergents to break down soil. The extraction removes the soil — but the detergent itself is sticky and remains in the fiber. This residue has a natural affinity for new dirt, dust, and oils. Studies by the Carpet and Rug Institute show 68% of traditionally cleaned carpets re-soil visibly within 14 days. RF™ cleaning breaks this cycle by eliminating the residue itself." },
    { q: "Is residue-free cleaning safe for pets and children?", a: "Yes — completely. Because the RF™ process is designed to remove all cleaning agents from the surface, there is nothing left behind for pets or children to contact. With RF™, carpets are safe to use as soon as they are dry — typically 4-6 hours after cleaning." },
    { q: "How does RF™ cleaning differ from dry cleaning?", a: "Dry cleaning uses low-moisture powder or foam that absorbs soil then is vacuumed away. While this avoids re-soiling, it does not achieve deep-fiber extraction. RF™ uses Prochem hot water extraction at 300-500 PSI for carpet to reach deep fiber contamination, followed by a neutralization rinse that removes all cleaning agents. Deep clean results with zero residue." },
    { q: "What is the chemistry behind residue-free cleaning?", a: "Traditional detergents are surfactants — molecules that lift soil effectively but whose polar charge makes them adhesive to natural fibers. RF™ uses a pH-balanced, low-surfactant formula combined with a proprietary neutralization rinse. The rinse binds to remaining surfactant molecules and encapsulates them for extraction, bringing pH to neutral 7.0. At neutral pH, fibers have no electrostatic charge and cannot attract or hold new soil." },
    { q: "What equipment does Tropical Breeze RF™ use?", a: "We use a professional Prochem truck-mount system with a Rotovac Powerwand 360 for carpet cleaning. The Prochem delivers 200F+ temperature. The Rotovac uses dual-rotary heads to clean from 360 degrees, removing significantly more soil than standard wands. For tile and grout we use up to 1,200+ PSI rotary extraction. For carpet we use 300-500 PSI — appropriate for carpet fibers." },
    { q: "How much longer does RF™ cleaning last vs traditional?", a: "RF™ cleaned areas maintained visibly clean appearance for 3x longer than traditionally cleaned areas under the same foot traffic — approximately 18-24 months between professional cleanings for RF™ vs 6-8 months for traditional methods." },
  ];

  const healthData = [
    { stat: "200,000", label: "Dust mites per ounce of carpet dust", detail: "A single gram of carpet dust can contain up to 200,000 dust mites. Each mite produces 20 waste particles per day — a primary trigger for asthma and allergic rhinitis.", source: "American Lung Association" },
    { stat: "4,000x", label: "More bacteria than a toilet seat", detail: "Research from NYU found the average carpet contains approximately 200,000 bacteria per square inch — 4,000 times more than a toilet seat.", source: "NYU Microbiologist Study" },
    { stat: "68%", label: "Re-soil within 2 weeks", detail: "The Carpet and Rug Institute found 68% of traditionally cleaned carpets showed visible re-soiling within 14 days, compared to less than 10% with residue-free methods.", source: "Carpet and Rug Institute" },
    { stat: "80%", label: "Of home allergens in soft surfaces", detail: "The EPA estimates 80% of household allergens — including dust mites, pet dander, mold spores, and pollen — are trapped in soft surfaces.", source: "U.S. Environmental Protection Agency" },
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
            🔬 The Definitive Guide
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            WHAT IS<br /><span className="text-teal-300">RESIDUE-FREE</span><br />CLEANING?
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto mb-8">
            The complete science, chemistry, and health data behind the RF™ process — and why it outperforms every traditional cleaning method on the Eastern Shore.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-4 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Experience RF™ — Book Now
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">The Simple Answer</span>
          <h2 className="font-black text-[#0a1628] leading-none mb-8" style={{fontSize:"clamp(32px,4vw,56px)"}}>
            RESIDUE-FREE MEANS<br /><span className="text-teal-600">NOTHING IS LEFT BEHIND</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">When a surface is cleaned with soap or detergent, the cleaning agent bonds to the fiber. Traditional cleaning removes the soil — but not the cleaning agent. That remaining cleaning agent is soap residue. Its molecular structure makes it adhesive to both the fiber and to new soil particles.</p>
              <p className="text-gray-900 text-lg font-bold">The result: carpets that look clean for 2 weeks, then look worse than before they were cleaned.</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="font-black text-teal-800 text-xl mb-6">The RF™ Definition</h3>
              <div className="space-y-4">
                {["Cleaning agent is fully neutralized and removed after lifting soil","Fiber pH returns to neutral 6.8-7.2 — no electrostatic charge","No adhesive surface for new soil to bond to","Clean lasts 3x longer than traditional methods","Dry in 4-6 hours — not 24-48 hours","Safe for pets, children, and allergy sufferers immediately after drying"].map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <span className="text-teal-500 font-bold flex-shrink-0">✓</span>
                    <p className="text-teal-700 font-medium text-sm leading-relaxed">{item}</p>
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
              PROFESSIONAL GRADE<br /><span className="text-teal-600">PROCHEM EQUIPMENT</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-2">Rotovac Powerwand 360</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Standard wands only clean in two directions. Our Rotovac Powerwand uses dual-rotary heads to deep-clean every fiber from 360 degrees, removing significantly more soil than traditional methods. Used at 300-500 PSI for carpet cleaning.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-2">Prochem Truckmount</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The gold standard in hot water extraction. We deliver 200F+ heat directly from our truck to your door, instantly sanitizing and killing bacteria on contact. Combined with our RF™ neutralization process for zero residue results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">The Health Case</span>
            <h2 className="font-black text-white leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              WHY CLEAN CARPETS<br /><span className="text-teal-300">ARE A HEALTH ISSUE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {healthData.map((h) => (
              <div key={h.stat} className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8 hover:bg-opacity-10 transition-all">
                <div className="font-black text-teal-300 leading-none mb-3" style={{fontSize:"clamp(36px,5vw,52px)"}}>{h.stat}</div>
                <div className="text-white font-bold text-sm mb-3">{h.label}</div>
                <p className="text-sky-200 text-xs leading-relaxed mb-3">{h.detail}</p>
                <div className="text-sky-400 text-xs opacity-60 italic">{h.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Every Question Answered</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              RESIDUE-FREE<br /><span className="text-teal-600">FAQ</span>
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="font-black text-[#0a1628] text-lg mb-4">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-4">RF™ Cleaning for Every Surface</h2>
          <p className="text-gray-500 mb-10">Every service uses the RF™ residue-free standard</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning"},{name:"Upholstery",href:"/upholstery"},{name:"Tile and Grout",href:"/tile-grout"},{name:"Hardwood Floors",href:"/hardwood"},{name:"Window Cleaning",href:"/windows"},{name:"EZ Breeze",href:"/ez-breeze"}].map((s) => (
              <Link key={s.name} href={s.href} className="bg-teal-50 border border-teal-200 text-teal-700 font-bold px-6 py-3 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                {s.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,72px)"}}>
            READY TO EXPERIENCE<br /><span className="text-orange-400">RF™ CLEAN?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Book online for an instant quote. Serving 33+ cities across Maryland and Delaware.</p>
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
