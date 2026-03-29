import Link from 'next/link';

export default function Home() {
  const services = [
    { emoji: "🧼", name: "Carpet Cleaning", price: "RF99™ First Room $99", desc: "Our signature RF™ process removes dirt AND residue. Stays cleaner 3× longer than any competitor.", href: "/carpet-cleaning", stat: "3× longer clean" },
    { emoji: "🛋️", name: "Upholstery Cleaning", price: "Chairs $50 · Sofas from $85", desc: "Fiber-specific process for every fabric type. Pet odor enzyme treatment included on request.", href: "/upholstery", stat: "Safe for all fabrics" },
    { emoji: "🪟", name: "Window Cleaning", price: "$13 per window", desc: "Pure water process removes salt-air mineral deposits. Screens, tracks, and sills included.", href: "/windows", stat: "Inside + outside" },
    { emoji: "⬜", name: "Tile & Grout", price: "$125 per room", desc: "1,200+ PSI extraction removes years of buildup. Orange sprinkler stains — our specialty.", href: "/tile-grout", stat: "1,200+ PSI" },
    { emoji: "🪵", name: "Hardwood Floors", price: "$1.00/sq ft", desc: "We identify your finish type before touching anything. Low-moisture RF™ process protects your investment.", href: "/hardwood", stat: "Inspection first" },
    { emoji: "🌴", name: "EZ Breeze Cleaning", price: "Free assessment", desc: "Vinyl-safe process only. Salt air, pollen, oxidation — we restore your fairway and bay views.", href: "/ez-breeze", stat: "Vinyl-safe only" },
  ];

  const didYouKnow = [
    { label: "⚠️ Health Alert", stat: "200K", text: "Dust mites per ounce of carpet dust living in your home right now", source: "American Lung Association" },
    { label: "😱 Shocking Fact", stat: "4,000×", text: "More bacteria on your carpet than a toilet seat — yes, really", source: "NYU Microbiologist Study" },
    { label: "📊 Industry Data", stat: "68%", text: "Of traditionally cleaned carpets re-soil within 2 weeks of cleaning", source: "Carpet & Rug Institute" },
    { label: "🌿 RF™ Difference", stat: "3×", text: "Longer clean with RF™ vs traditional methods — guaranteed", source: "Tropical Breeze RF™" },
    { label: "⚡ Fast Dry", stat: "4–6hr", text: "RF™ dry time vs 24–48 hours traditional — back to normal same day", source: "Tropical Breeze RF™" },
    { label: "🏠 Indoor Air", stat: "80%", text: "Of home allergens live in soft surfaces — carpets, upholstery, rugs", source: "U.S. EPA" },
  ];

  const reviews = [
    { text: "My carpets look brand new. They haven't gotten dirty again after 3 weeks — that never happens with other companies.", author: "Sarah M.", city: "Ocean City, MD" },
    { text: "Used them for my vacation rental between guests. Guests commented on how clean and fresh everything smelled.", author: "James T.", city: "Rehoboth Beach, DE" },
    { text: "EZ Breeze panels were yellowed and streaky. After RF™ cleaning they look like they were just installed.", author: "Linda K.", city: "The Peninsula, DE" },
    { text: "Three dogs, two kids. My sofas were a disaster. They got everything out — including the smell.", author: "Mike R.", city: "Salisbury, MD" },
    { text: "Called in the morning, they were here by noon. Windows look perfect — got the salt buildup off my bay-facing windows.", author: "Carol D.", city: "Lewes, DE" },
    { text: "Tile grout was orange from sprinklers. I thought I'd have to replace the floor. Restored it completely in 2 hours.", author: "Tom B.", city: "Berlin, MD" },
  ];

  const mdCities = ["Salisbury", "Ocean City", "Berlin", "Ocean Pines", "Cambridge", "Easton", "St Michaels", "Princess Anne", "Fruitland", "Delmar", "Snow Hill", "Pocomoke City"];
  const deCities = ["Rehoboth Beach", "Bethany Beach", "Fenwick Island", "Lewes", "Milton", "Georgetown", "Seaford", "Milford", "The Peninsula", "Bayside", "Heritage Shores"];

  const process = [
    { step: "01", name: "Pure Flow Mark™", desc: "pH-balanced solution breaks down dirt and old residue" },
    { step: "02", name: "Residue Break™", desc: "200°F extraction at 1,200+ PSI removes everything" },
    { step: "03", name: "Zero Trace Seal™", desc: "Neutralizes all pH — removes every soap molecule" },
    { step: "04", name: "Clean Wake™", desc: "Final inspection confirms zero residue remains" },
    { step: "05", name: "Clear Path Icon™", desc: "Walk-ready in 4–6 hours — not 24–48" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-400 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1s'}} />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L0,120Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse inline-block" />
              Now Serving 33+ Cities · MD & DE Eastern Shore
            </div>
            <h1 className="font-black text-white leading-none mb-6" style={{fontSize:'clamp(52px,8vw,96px)',letterSpacing:'-1px'}}>
              YOUR HOME<br />
              <span className="text-teal-300">DESERVES</span><br />
              <span className="text-orange-400">BETTER.</span>
            </h1>
            <p className="text-xl text-sky-100 leading-relaxed mb-10 max-w-xl opacity-90">
              Traditional cleaning leaves <strong className="text-white">soap residue</strong> that re-attracts dirt within days. Our RF™ process removes the dirt <strong className="text-white">AND</strong> the residue — so your home stays cleaner up to <strong className="text-teal-300">3× longer.</strong>
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
                🌴 Get Instant Quote
              </Link>
              <a href="tel:4438563244" className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 hover:-translate-y-1 transition-all duration-300">
                📞 443-856-3244
              </a>
            </div>
            <div className="flex flex-wrap gap-8">
              {[{n:"365+",l:"5-Star Reviews"},{n:"33+",l:"Cities Served"},{n:"3×",l:"Longer Clean"},{n:"4–6hr",l:"Dry Time"}].map(s => (
                <div key={s.n}>
                  <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                  <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RF99 CARD */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
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
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">The Hidden Problem</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:'clamp(36px,5vw,64px)'}}>
                WHY YOUR CARPETS<br /><span className="text-teal-600">GET DIRTY AGAIN SO FAST</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Most cleaning companies leave behind a layer of soap residue. It's invisible — but it's a magnet for new dirt. Within 2 weeks your carpets look worse than before they were cleaned.
              </p>
              <p className="text-gray-800 font-bold text-lg">The RF™ process was built to fix exactly this.</p>
              <Link href="/residue-free" className="inline-flex items-center gap-2 text-teal-600 font-bold mt-6 hover:text-teal-800 transition group">
                What is Residue-Free? Learn the science →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: "😤", color: "red", title: "Traditional Cleaning Leaves Residue", body: "Soap and detergent stay deep in fibers, acting like glue for new dirt particles every day" },
                { icon: "⏱️", color: "red", title: "Re-soiling Happens Within 2 Weeks", body: "68% of traditionally cleaned carpets look dirty again within 14 days — Carpet & Rug Institute" },
                { icon: "🦠", color: "red", title: "Your Carpet Is a Health Risk", body: "200,000 dust mites per ounce of carpet dust. 80% of home allergens live in soft surfaces — EPA" },
                { icon: "✅", color: "teal", title: "RF™ Removes It All — Permanently", body: "Zero residue left behind. Carpets stay cleaner 3× longer. Dry in 4–6 hours, not 2 days." },
              ].map((card) => (
                <div key={card.title} className={`flex gap-4 p-5 rounded-2xl border ${card.color === 'red' ? 'bg-red-50 border-red-100' : 'bg-teal-50 border-teal-200'}`}>
                  <span className="text-2xl flex-shrink-0">{card.icon}</span>
                  <div>
                    <div className={`font-bold text-sm mb-1 ${card.color === 'red' ? 'text-red-700' : 'text-teal-700'}`}>{card.title}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{card.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DID YOU KNOW */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">Did You Know?</span>
            <h2 className="font-black text-white leading-none" style={{fontSize:'clamp(36px,5vw,64px)'}}>
              THE DATA<br /><span className="text-teal-300">DOESN'T LIE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {didYouKnow.map((d) => (
              <Link key={d.stat} href="/residue-free" className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-8 text-center hover:bg-opacity-10 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm group block">
                <div className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">{d.label}</div>
                <div className="font-black text-teal-300 leading-none mb-4" style={{fontSize:'clamp(40px,6vw,64px)'}}>{d.stat}</div>
                <div className="text-sky-200 text-sm leading-relaxed mb-3">{d.text}</div>
                <div className="text-sky-400 text-xs opacity-60 italic mb-4">{d.source}</div>
                <div className="text-teal-300 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">What We Clean</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:'clamp(36px,5vw,64px)'}}>
              EVERY SURFACE.<br /><span className="text-teal-600">ONE STANDARD.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">Every service performed to the RF™ residue-free standard. No exceptions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.name} href={s.href} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-teal-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="text-4xl block mb-4">{s.emoji}</span>
                <h3 className="font-black text-[#0a1628] text-xl mb-2">{s.name}</h3>
                <div className="text-teal-600 font-semibold text-sm mb-3">{s.price}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{s.stat}</span>
                  <span className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform">Book Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">How It Works</span>
          <h2 className="font-black text-[#0a1628] leading-none mb-4" style={{fontSize:'clamp(36px,5vw,64px)'}}>
            FIVE STEPS.<br /><span className="text-teal-600">ZERO RESIDUE.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-16 max-w-xl mx-auto">Every job follows the same 5-step RF™ protocol. No exceptions, no shortcuts, no residue.</p>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-500 to-orange-400" />
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((p) => (
                <div key={p.step} className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-[#0a1628] text-sm mb-2">{p.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Link href="/residue-free" className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-100 transition">
              🔬 Read the Full RF™ Science Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">365+ Five-Star Reviews</span>
          <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:'clamp(36px,5vw,64px)'}}>
            WHAT THE<br /><span className="text-teal-600">EASTERN SHORE SAYS</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <div className="flex gap-6 w-max" style={{animation:'marquee 40s linear infinite'}}>
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="w-80 flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-4">"{r.text}"</p>
                <div className="font-bold text-[#0a1628] text-sm">{r.author}</div>
                <div className="text-teal-600 text-xs font-semibold">{r.city}</div>
              </div>
            ))}
     </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* HCP REVIEWS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-10">Live Customer Reviews</h2>
          <div className="flex justify-center">
            <iframe src="https://client.housecallpro.com/reviews/widget/org_50b68db028f14c63aac14e1697f85fa8" height="800" width="100%" style={{border:'none',maxWidth:'900px'}} title="Customer Reviews" />
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Service Area</span>
          <h2 className="font-black text-[#0a1628] leading-none mb-4" style={{fontSize:'clamp(36px,5vw,64px)'}}>
            33+ CITIES.<br /><span className="text-teal-600">ONE STANDARD.</span>
          </h2>
          <p className="text-gray-500 mb-12">Maryland teal · Delaware orange — click any city to see local RF™ services</p>
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Maryland</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {mdCities.map((city) => (
                <Link key={city} href={`/${city.toLowerCase().replace(/\s+/g,'-')}-md`}
                  className="bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:scale-105 transition-all duration-200">
                  {city} MD
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Delaware</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {deCities.map((city) => (
                <Link key={city} href={`/${city.toLowerCase().replace(/\s+/g,'-')}-de`}
                  className="bg-orange-50 border border-orange-200 text-orange-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-105 transition-all duration-200">
                  {city} DE
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="font-black text-white" style={{fontSize:'300px'}}>RF™</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-6">Ready?</span>
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:'clamp(40px,6vw,80px)'}}>
            RESIDUE DOESN'T<br /><span className="text-orange-400">SURVIVE HERE™</span>
          </h2>
          <p className="text-sky-200 text-xl mb-12 leading-relaxed">Book online for an instant quote and exclusive savings.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-300">
              🌴 Book Online — Get Instant Quote
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-xl px-10 py-6 rounded-full hover:bg-opacity-20 hover:-translate-y-1 transition-all duration-300">
              📞 Call 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <a href="tel:4438563244" className="fixed bottom-24 left-4 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2" style={{animation:'float 3s ease-in-out infinite'}}>
        🌴 Book Now
        <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }`}</style>
      </a>

    </main>
  );
}
   