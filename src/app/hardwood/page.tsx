import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardwood Floor Cleaning in MD & DE | Low-Moisture RF™ | $1.00/Sq Ft",
  description:
    "RF™ low-moisture hardwood floor cleaning. Free finish inspection before every job. Safe for polyurethane, oil-based, engineered, and all hardwood types. $1.00/sq ft. Eastern Shore MD & DE. Call 443-856-3244.",
  alternates: {
    canonical: "https://tropicalbreezerf.com/hardwood",
  },
  openGraph: {
    title: "Hardwood Floor Cleaning — Low-Moisture RF™ | Tropical Breeze RF™",
    description:
      "$1.00/sq ft. Free finish inspection before every job. Dry in 1–2 hours. Safe for all hardwood types. Eastern Shore MD & DE.",
    url: "https://tropicalbreezerf.com/hardwood",
  },
};

const hardwoodSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "RF™ Hardwood Floor Cleaning",
  provider: { "@type": "LocalBusiness", name: "Tropical Breeze RF™", telephone: "+1-443-856-3244", url: "https://tropicalbreezerf.com" },
  serviceType: "Hardwood Floor Cleaning",
  areaServed: "Maryland and Delaware Eastern Shore",
  description: "Low-moisture RF™ hardwood floor cleaning. Free finish inspection before every job. Dry in 1–2 hours. Safe for all finish types.",
  offers: { "@type": "Offer", price: "1.00", priceCurrency: "USD", description: "Per square foot — includes free finish inspection" },
};

export default function Hardwood() {
  const finishTypes = [
    { icon: "🪵", name: "Polyurethane Finish", desc: "Most common hardwood finish. RF™ low-moisture process deep cleans without penetrating the protective layer or causing hazing.", compatible: true },
    { icon: "🫙", name: "Oil-Based Finish", desc: "Requires low-moisture cleaning to prevent finish lifting. Our pH-neutral solution is safe for oil-finished floors.", compatible: true },
    { icon: "✨", name: "Aluminum Oxide", desc: "Found in factory-finished engineered hardwood. Extremely durable. RF™ cleaning maintains finish integrity while removing embedded soil.", compatible: true },
    { icon: "⚠️", name: "Wax Finish", desc: "Older wax-finished floors are moisture-sensitive. We identify wax finishes during inspection and use dry cleaning methods only.", compatible: true },
    { icon: "🌊", name: "Unfinished / Raw Wood", desc: "Requires specialized dry cleaning methods. We assess condition and porosity before recommending any process.", compatible: true },
    { icon: "🔍", name: "Unknown Finish", desc: "We perform a finish identification test before cleaning. A drop of water tells us the finish type — we never guess.", compatible: true },
  ];

  const faqs = [
    { q: "How much does hardwood floor cleaning cost?", a: "$1.00 per square foot — with a free inspection before every job. Minimum service charge applies. Call 443-856-3244 for a free estimate." },
    { q: "Why do you inspect before cleaning?", a: "Hardwood finish type determines the correct cleaning method. Using the wrong process can cause hazing, swelling, or permanent damage. Inspection takes 5 minutes and protects your floor." },
    { q: "Is moisture safe for hardwood floors?", a: "Low moisture yes, high moisture no. Our RF™ low-moisture process uses minimal water — floors dry in 1–2 hours. Traditional steam cleaning leaves floors wet for 24+ hours causing cupping and damage." },
    { q: "What about Eastern Shore humidity?", a: "High humidity is the number one enemy of hardwood floors on the Shore. Our low-moisture process eliminates the risk of moisture damage that traditional cleaning causes." },
    { q: "Can you clean engineered hardwood?", a: "Yes — engineered hardwood is cleaned using the same low-moisture RF™ process. Engineered floors are more moisture-sensitive than solid hardwood, making our approach especially important." },
    { q: "What PSI do you use for hardwood?", a: "Hardwood floors use very low pressure — we use a gentle low-moisture extraction process, not high-pressure water. High PSI is for tile and grout only." },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hardwoodSchema) }}
      />

      <section className="relative py-32 px-6 bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40L48,37.3C96,35,192,29,288,32C384,35,480,45,576,48C672,51,768,45,864,40C960,35,1056,29,1152,32C1248,35,1344,45,1392,49.3L1440,53L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse inline-block" />
            Tropical Breeze RF™ · Hardwood Floor Cleaning
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            HARDWOOD CLEANING<br /><span className="text-teal-300">STARTS WITH</span><br />INSPECTION.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            We identify your floor finish type before touching anything. Then we apply the exact low-moisture RF™ process it needs — protecting your investment while deep cleaning every square foot.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🪵 Book Hardwood Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {[{n:"$1.00",l:"Per Sq Ft"},{n:"1–2hr",l:"Dry Time"},{n:"Free",l:"Inspection"},{n:"365+",l:"5-Star Reviews"}].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">The Eastern Shore Problem</span>
          <h2 className="font-black text-white leading-none mb-16" style={{fontSize:"clamp(32px,4vw,56px)"}}>
            HUMIDITY IS YOUR<br /><span className="text-teal-300">FLOOR&apos;S BIGGEST ENEMY</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { stat: "60–80%", label: "Average summer humidity in coastal MD/DE", detail: "The Eastern Shore maritime climate is the primary threat to hardwood floors." },
              { stat: "8%", label: "Maximum safe moisture content for hardwood", detail: "Moisture above 8% causes wood fibers to swell, leading to cupping and buckling." },
              { stat: "24hrs", label: "Traditional cleaning wet time — dangerous", detail: "24–48 hours of moisture exposure from traditional cleaning can cause permanent damage." },
              { stat: "1–2hr", label: "RF™ dry time for hardwood — safe", detail: "Our low-moisture process eliminates the risk of moisture damage entirely." },
            ].map((h) => (
              <div key={h.stat} className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8 hover:bg-opacity-10 transition-all">
                <div className="font-black text-teal-300 leading-none mb-3" style={{fontSize:"clamp(28px,4vw,44px)"}}>{h.stat}</div>
                <div className="text-white font-bold text-sm mb-2">{h.label}</div>
                <div className="text-sky-300 text-xs leading-relaxed">{h.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Every Finish Type</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              WE CLEAN EVERY<br /><span className="text-teal-600">HARDWOOD FINISH</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {finishTypes.map((f) => (
              <div key={f.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-2">{f.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{f.desc}</p>
                <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">
                  RF™ Process Available
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              HARDWOOD<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
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
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Upholstery",href:"/upholstery",icon:"🛋️"},{name:"Tile and Grout",href:"/tile-grout",icon:"⬜"},{name:"Window Cleaning",href:"/windows",icon:"🪟"},{name:"EZ Breeze",href:"/ez-breeze",icon:"🌴"}].map((s) => (
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
            READY TO RESTORE<br /><span className="text-orange-400">YOUR HARDWOOD?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">$1.00/sq ft · Inspection first · Serving 33+ cities across MD and DE</p>
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
