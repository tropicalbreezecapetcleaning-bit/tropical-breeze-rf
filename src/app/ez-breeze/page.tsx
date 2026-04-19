import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EZ Breeze Cleaning in MD & DE | Vinyl-Safe RF™ | Eastern Shore Specialists",
  description:
    "RF™ EZ Breeze panel cleaning using vinyl-safe solutions only. Removes salt air, pollen, and oxidation without damaging panels. Free assessment. Serving golf communities and waterfront homes across MD & DE. Call 443-856-3244.",
  alternates: {
    canonical: "https://tropicalbreezerf.com/ez-breeze",
  },
  openGraph: {
    title: "EZ Breeze Cleaning — Vinyl-Safe Specialists | Tropical Breeze RF™",
    description:
      "Free EZ Breeze assessment. Vinyl-safe RF™ process only. Removes salt air, pollen, yellowing, and oxidation. Eastern Shore golf communities and waterfront homes.",
    url: "https://tropicalbreezerf.com/ez-breeze",
  },
};

const ezBreezeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "EZ Breeze Panel Cleaning",
  provider: { "@type": "LocalBusiness", name: "Tropical Breeze RF™", telephone: "+1-443-856-3244", url: "https://tropicalbreezerf.com" },
  serviceType: "EZ Breeze Cleaning",
  areaServed: "Maryland and Delaware Eastern Shore",
  description: "Vinyl-safe RF™ EZ Breeze panel cleaning. Removes salt air, pollen, yellowing, and oxidation. Free assessment before every job.",
  offers: { "@type": "Offer", description: "Free assessment — pricing based on panel count and condition" },
};

export default function EzBreeze() {
  const mistakes = [
    { icon: "❌", mistake: "Using Windex or Glass Cleaners", result: "Ammonia in glass cleaners breaks down vinyl polymers, causing yellowing and brittleness over time." },
    { icon: "❌", mistake: "Pressure Washing", result: "High-pressure water forces into panel seams causing seal failure, water infiltration, and frame corrosion. Never pressure wash EZ Breeze." },
    { icon: "❌", mistake: "Abrasive Scrubbing", result: "Vinyl scratches easily. Any abrasive material creates micro-scratches that permanently cloud the panel." },
    { icon: "❌", mistake: "Dish Soap and Water", result: "Dish soap residue creates a hazy film that becomes progressively harder to clean." },
    { icon: "✅", mistake: "The RF™ Way: Vinyl-Safe Solutions", result: "pH-neutral, vinyl-safe cleaner applied with microfiber. Rinsed with pure water. Tracks and frames cleaned separately." },
  ];

  const faqs = [
    { q: "What is EZ Breeze?", a: "EZ Breeze is a vinyl panel enclosure system used to enclose porches, patios, and sunrooms. The panels are made of polycarbonate or PVC vinyl — not glass. Extremely popular in Eastern Shore golf communities and waterfront homes." },
    { q: "Why can't I use regular glass cleaner on EZ Breeze?", a: "Glass cleaners contain ammonia which breaks down vinyl polymers over time, causing yellowing, brittleness, and surface degradation. EZ Breeze requires vinyl-safe cleaning solutions only." },
    { q: "Can you restore yellowed EZ Breeze panels?", a: "In many cases yes. Yellowing from oxidation and UV exposure can be significantly reduced with our vinyl restoration treatment." },
    { q: "How often should EZ Breeze be cleaned?", a: "On the Eastern Shore we recommend 2–3 times per year due to pollen, salt air, and humidity buildup. Golf community properties often benefit from quarterly cleaning." },
    { q: "What does EZ Breeze cleaning cost?", a: "EZ Breeze pricing is consultation-based due to variation in panel count and condition. We provide a free assessment and written quote before any work begins. Call 443-856-3244." },
    { q: "Do you clean the tracks and frames too?", a: "Yes — tracks are critical. Dirt in tracks causes panels to bind and skip. We vacuum and wipe every track as part of every cleaning service." },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ezBreezeSchema) }}
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
            Tropical Breeze RF™ · EZ Breeze Specialists
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            EZ BREEZE<br /><span className="text-teal-300">CLEANING DONE</span><br />RIGHT.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-10">
            EZ Breeze vinyl panels are not glass. The wrong cleaner — even once — can cause permanent yellowing, scratching, or seal failure. We inspect every panel before touching it and use only vinyl-safe processes.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book Free EZ Breeze Assessment
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">What Damages EZ Breeze</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              THE CLEANING MISTAKES<br /><span className="text-teal-600">THAT RUIN PANELS</span>
            </h2>
          </div>
          <div className="space-y-4">
            {mistakes.map((m) => (
              <div key={m.mistake} className={`flex gap-6 items-start p-6 rounded-2xl border ${m.icon === "✅" ? "bg-teal-50 border-teal-200" : "bg-red-50 border-red-100"}`}>
                <span className="text-3xl flex-shrink-0">{m.icon}</span>
                <div>
                  <h3 className={`font-black text-lg mb-2 ${m.icon === "✅" ? "text-teal-700" : "text-red-700"}`}>{m.mistake}</h3>
                  <p className="text-gray-600 leading-relaxed">{m.result}</p>
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
              EZ BREEZE<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
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
            {[{name:"Carpet Cleaning",href:"/carpet-cleaning",icon:"🧼"},{name:"Upholstery",href:"/upholstery",icon:"🛋️"},{name:"Tile and Grout",href:"/tile-grout",icon:"⬜"},{name:"Hardwood Floors",href:"/hardwood",icon:"🪵"},{name:"Window Cleaning",href:"/windows",icon:"🪟"}].map((s) => (
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
            READY FOR<br /><span className="text-orange-400">PERFECT EZ BREEZE?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Free assessment · Vinyl-safe only · Serving 33+ cities across MD and DE</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book Free Assessment
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
