import { db } from '@/db';
import { cities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allCities = await db.select({ slug: cities.slug }).from(cities);
  return allCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const { slug: citySlug } = await params;
  const city = await db.select().from(cities).where(eq(cities.slug, citySlug)).limit(1);
  if (!city[0]) return {};
  return {
    title: `RF Cleaning in ${city[0].name}, ${city[0].state} | Tropical Breeze RF`,
    description: city[0].metaDescription || `Professional residue-free cleaning in ${city[0].name}, ${city[0].state}. Carpet, tile, windows, upholstery, hardwood, EZ Breeze. Prochem truckmount. Call 443-856-3244.`,
    alternates: {
      canonical: `https://tropicalbreezerf.com/${citySlug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug: citySlug } = await params;
  const result = await db.select().from(cities).where(eq(cities.slug, citySlug)).limit(1);
  const city = result[0];
  if (!city) notFound();

  const nearbyList: string[] = city.nearbyCities ? JSON.parse(city.nearbyCities) : [];

  const services = [
    { icon: "🧼", name: "Carpet Cleaning", price: "$99 first room", slug: "carpet-cleaning", desc: "RF99 process with Prochem truckmount and Rotovac Powerwand 360. Dry in 4-6 hours.", active: city.offersCarpet },
    { icon: "🛋️", name: "Upholstery Cleaning", price: "From $50", slug: "upholstery", desc: "Fiber-specific RF process for every sofa, chair, and sectional. Pet odor enzyme treatment available.", active: city.offersUpholstery },
    { icon: "⬜", name: "Tile and Grout", price: "$125 per room", slug: "tile-grout", desc: "Up to 1,200+ PSI rotary extraction. Orange sprinkler stains are our Eastern Shore specialty.", active: city.offersTileGrout },
    { icon: "🪵", name: "Hardwood Floors", price: "$1.00 per sq ft", slug: "hardwood", desc: "Low-moisture RF process safe for all finishes. Free inspection before every job.", active: city.offersHardwood },
    { icon: "🪟", name: "Window Cleaning", price: "$13 per window", slug: "window-cleaning", desc: "Pure water process removes salt-air mineral deposits. Inside, outside, screens, tracks, sills.", active: city.offersWindow },
    { icon: "🌴", name: "EZ Breeze Cleaning", price: "Free assessment", slug: "ez-breeze", desc: "Vinyl-safe solutions only. Never ammonia-based. Restores your view streak-free.", active: city.offersEzBreeze },
    { icon: "🪄", name: "Area Rug Cleaning", price: "From $75", slug: "area-rugs", desc: "Pickup and delivery included. RF process safe for all rug types and fibers.", active: city.offersAreaRugs },
  ].filter(s => s.active);

  const faqs = [
    {
      q: `How much does carpet cleaning cost in ${city.name}?`,
      a: `Our RF99 process starts at $99 for the first room (up to 200 sq ft) and $50 for each additional room in ${city.name}. This includes our Prochem truckmount hot water extraction and Rotovac Powerwand 360 at 300-500 PSI. Dry in 4-6 hours.`
    },
    {
      q: `What makes RF cleaning different from other carpet cleaners in ${city.name}?`,
      a: `Traditional cleaning companies in the ${city.state} area leave soap residue in carpet fibers that re-attracts dirt within 2 weeks. Our RF (Residue-Free) process uses a neutralization rinse that removes every cleaning molecule after extraction. Your carpets stay cleaner up to 3x longer.`
    },
    {
      q: `Do you serve all of ${city.name} and surrounding areas?`,
      a: `Yes - we serve all of ${city.name} and the surrounding ${city.region || city.state} area including ${nearbyList.slice(0, 3).join(', ')}${nearbyList.length > 3 ? ' and more' : ''}. Call 443-856-3244 to confirm availability for your specific address.`
    },
    {
      q: `What equipment do you use in ${city.name}?`,
      a: `We use a professional Prochem truck-mount hot water extraction system with a Rotovac Powerwand 360 for carpet cleaning at 300-500 PSI. For tile and grout we use up to 1,200+ PSI rotary extraction. This is professional grade equipment, not the consumer rental machines other companies use.`
    },
    {
      q: `How long does carpet cleaning take in ${city.name}?`,
      a: `Most rooms take 20-40 minutes. A full home is typically 2-4 hours depending on size and condition. Carpets are walk-ready in 4-6 hours with our RF process - not 24-48 hours like traditional cleaning.`
    },
    {
      q: `Is RF cleaning safe for pets and children in ${city.name}?`,
      a: `Completely safe. The RF process is specifically designed to remove all cleaning agents from fibers. There is nothing left behind for pets or children to contact. Safe immediately after drying.`
    },
  ];

  const stats = [
    { n: "365+", l: "5-Star Reviews" },
    { n: "3x", l: "Longer Clean" },
    { n: "4-6hr", l: "Dry Time" },
    { n: "33+", l: "Cities Served" },
  ];

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
            Tropical Breeze RF · {city.state} · {city.region || "Eastern Shore"}
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            {city.h1Headline || `RF CLEANING IN ${city.name.toUpperCase()}, ${city.state}`}
          </h1>
          {city.localHook && (
            <p className="text-xl text-teal-300 font-bold leading-relaxed max-w-2xl mb-4 italic">
              "{city.localHook}"
            </p>
          )}
          <p className="text-lg text-sky-100 leading-relaxed max-w-2xl mb-10">
            {city.localChallenge || `Professional residue-free cleaning in ${city.name}, ${city.state}. Prochem truckmount, Rotovac Powerwand 360, zero residue left behind. Serving all of ${city.region || city.state}.`}
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book RF Service in {city.name}
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {stats.map(s => (
              <div key={s.n}>
                <div className="text-4xl font-black text-teal-300 leading-none">{s.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL CHALLENGE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">{city.name}, {city.state} · Local Expertise</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(28px,4vw,52px)"}}>
                THE {city.name.toUpperCase()}<br /><span className="text-teal-600">CLEANING CHALLENGE</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {city.localChallenge || `${city.name} homeowners face unique cleaning challenges from the Eastern Shore's coastal humidity, salt air exposure, and iron-rich groundwater. Standard cleaning methods leave residue that re-attracts these environmental contaminants within days.`}
              </p>
              {city.waterQualityNote && (
                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-5 mb-6">
                  <div className="text-teal-700 font-bold text-sm mb-1">💧 Water Quality Note</div>
                  <p className="text-teal-600 text-sm leading-relaxed">{city.waterQualityNote}</p>
                </div>
              )}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The RF process was specifically developed for Eastern Shore conditions. Our Prochem truck-mount system with Rotovac Powerwand 360 delivers 200F+ heat extraction followed by a neutralizing rinse that removes every cleaning molecule — leaving surfaces genuinely clean, not just visually clean.
              </p>
              <div className="space-y-3">
                {[
                  `Serving all of ${city.name} and ${city.region || city.state}`,
                  "Prochem truckmount + Rotovac Powerwand 360 on every job",
                  "RF process — stays cleaner 3x longer than traditional cleaning",
                  "Licensed, insured, locally operated from Salisbury MD",
                  "365+ five-star reviews across the Eastern Shore",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-black text-[#0a1628] text-lg mb-4">Why RF Works Better in {city.name}</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🌊", title: "Salt Air Mineral Deposits", desc: "Coastal proximity means windows and tile accumulate mineral deposits faster. Our pure water process and high-PSI extraction dissolve them completely." },
                    { icon: "💧", title: "Iron-Rich Groundwater", desc: "Eastern Shore well water leaves orange iron staining on tile grout. Our mineral-specific treatment is the only reliable solution." },
                    { icon: "☁️", title: "High Coastal Humidity", desc: "Humidity accelerates mold growth in grout and re-soiling in carpet. RF residue-free process eliminates the sticky surface that attracts moisture-borne contamination." },
                    { icon: "🏖️", title: "Vacation Rental Turnover", desc: "RF 4-6 hour dry time means same-day turnaround between guests. Never lose a rental night to wet carpets." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-bold text-[#0a1628] text-sm mb-1">{item.title}</div>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
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
            <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-2">🌸 Spring Offer</p>
            <h2 className="font-black text-white text-4xl">RF99 — First Room $99</h2>
            <p className="text-orange-100 mt-2">One room up to 200 sq ft + deodorizing treatment OR carpet protector. Perfect for {city.name} homes.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/booking" className="bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:bg-orange-50 transition text-lg">Book Online</Link>
            <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-6 py-4 rounded-full hover:bg-orange-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">RF Services in {city.name}</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              EVERY SURFACE.<br /><span className="text-teal-600">ONE STANDARD.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">Every service performed to the RF residue-free standard in {city.name}, {city.state}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-2 group-hover:text-teal-700 transition-colors">{s.name}</h3>
                <div className="text-teal-600 font-semibold text-sm mb-3">{s.price}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Book in {city.name} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Professional Equipment</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              NOT CONSUMER RENTALS.<br /><span className="text-teal-600">PROCHEM PROFESSIONAL.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-3">Rotovac Powerwand 360</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Standard wands only clean in two directions. Our Rotovac Powerwand uses dual-rotary heads to deep-clean every fiber from 360 degrees, removing significantly more soil than traditional methods at 300-500 PSI for carpet.</p>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="text-teal-700 text-sm font-bold">Carpet PSI: 300-500</div>
                <div className="text-teal-600 text-xs mt-1">Appropriate pressure for carpet fibers — not damaging like high-pressure systems</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-3">Prochem Truckmount</h3>
              <p className="text-gray-600 leading-relaxed mb-4">The gold standard in hot water extraction. We deliver 200F+ heat directly from our truck to your door, instantly sanitizing and killing bacteria on contact. Combined with our RF neutralization process for zero residue results.</p>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="text-teal-700 text-sm font-bold">Tile and Grout PSI: Up to 1,200+</div>
                <div className="text-teal-600 text-xs mt-1">Deep grout pore extraction only possible with professional rotary systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">{city.name} FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              CLEANING QUESTIONS<br /><span className="text-teal-600">FOR {city.name.toUpperCase()}</span>
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

      {/* NEARBY */}
      {nearbyList.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-black text-[#0a1628] text-2xl mb-4">Also Serving Near {city.name}</h2>
            <p className="text-gray-500 mb-8">RF cleaning available throughout {city.region || city.state} and the Eastern Shore.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {nearbyList.map((nearby) => (
                <span key={nearby} className="bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm px-5 py-2 rounded-full">
                  📍 {nearby}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HEALTH STATS */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase block mb-4">The Health Case for {city.name}</span>
            <h2 className="font-black text-white leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              WHAT IS LIVING IN YOUR<br /><span className="text-teal-300">CARPET RIGHT NOW</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { stat: "200K+", label: "Dust mites per oz of carpet dust", source: "American Lung Association" },
              { stat: "68%", label: "Re-soil within 2 weeks of traditional cleaning", source: "Carpet and Rug Institute" },
              { stat: "3x", label: "Longer clean with RF vs traditional methods", source: "Tropical Breeze RF" },
              { stat: "80%", label: "Of home allergens live in soft surfaces", source: "U.S. EPA" },
            ].map((h) => (
              <div key={h.stat} className="bg-white bg-opacity-5 border border-teal-400 border-opacity-20 rounded-2xl p-6 text-center hover:bg-opacity-10 transition-all">
                <div className="font-black text-teal-300 leading-none mb-3" style={{fontSize:"clamp(28px,4vw,44px)"}}>{h.stat}</div>
                <div className="text-white font-bold text-sm mb-2">{h.label}</div>
                <div className="text-sky-400 text-xs italic">{h.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,72px)"}}>
            READY FOR RF CLEAN<br /><span className="text-orange-400">IN {city.name.toUpperCase()}?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Does Not Survive Here · Serving {city.name} and all of {city.region || city.state}</p>
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
