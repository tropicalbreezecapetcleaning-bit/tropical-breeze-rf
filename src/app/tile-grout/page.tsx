import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile and Grout Cleaning | Tropical Breeze RF",
  description: "Professional tile and grout cleaning on the Eastern Shore. Up to 1200+ PSI rotary extraction. Orange sprinkler stains our specialty. Serving Maryland and Delaware. Call 443-856-3244.",
  alternates: { canonical: "https://tropicalbreezerf.com/tile-grout" },
};

const CDN = "https://d1chim18wmcawu.cloudfront.net/images";

export default function TileGroutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40L48,37.3C96,35,192,29,288,32C384,35,480,45,576,48C672,51,768,45,864,40C960,35,1056,29,1152,32C1248,35,1344,45,1392,49.3L1440,53L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            ⬜ Tile and Grout Cleaning · Eastern Shore MD and DE
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            TILE AND GROUT<br /><span className="text-teal-300">RESTORATION</span>
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-6">
            Eastern Shore iron-rich water leaves orange staining in grout that standard cleaning cannot remove. Our rotary extraction system at up to 1,200+ PSI is the only reliable solution.
          </p>
          <p className="text-lg text-sky-200 leading-relaxed max-w-2xl mb-10">
            Bathrooms, kitchens, entryways, and vacation rental properties across Maryland and Delaware. Color seal available to protect grout after cleaning.
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
            <div><div className="text-4xl font-black text-teal-300 leading-none">1200+</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">PSI Extraction</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">$125</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Per Room</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">RF</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Residue-Free</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">365+</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">5-Star Reviews</div></div>
          </div>
        </div>
      </section>

      {/* WHY RF */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Eastern Shore Specialty</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(28px,4vw,52px)"}}>
                ORANGE GROUT IS AN<br /><span className="text-teal-600">EASTERN SHORE PROBLEM</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The Eastern Shore's iron-rich groundwater is the primary cause of orange and rust-colored grout staining throughout Maryland and Delaware. Sprinkler systems pull this iron-laden water directly onto driveways, entryways, and pool areas — leaving orange deposits that household cleaners cannot remove.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our rotary extraction system delivers up to 1,200+ PSI directly into grout pores — far beyond what any consumer tool can achieve. Combined with our mineral-specific treatment and RF neutralization rinse, we restore grout to its original color without damaging tile surfaces.
              </p>
              <div className="space-y-3">
                {["Up to 1200+ PSI rotary extraction into grout pores", "Mineral-specific treatment for Eastern Shore iron staining", "Color seal available to protect grout after cleaning", "RF residue-free process - no sticky film left behind", "Same-day results - walk on tile immediately after drying"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-black text-[#0a1628] text-lg mb-4">Tile and Grout Services</h3>
                <div className="space-y-3">
                  {[
                    {name: "Bathroom Tile and Grout", price: "$125/room"},
                    {name: "Kitchen Tile and Grout", price: "$125/room"},
                    {name: "Entryway and Foyer", price: "$125/room"},
                    {name: "Color Seal Application", price: "Quote on-site"},
                    {name: "Iron Stain Treatment", price: "Included"},
                  ].map(s => (
                    <div key={s.name} className="flex justify-between items-center py-2 border-b border-teal-100 last:border-0">
                      <span className="text-gray-700 font-medium text-sm">{s.name}</span>
                      <span className="text-teal-700 font-black text-sm">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="font-black text-[#0a1628] text-lg mb-2">Equipment Used</div>
                <div className="text-gray-600 text-sm leading-relaxed">Rotary extraction head at up to 1,200+ PSI — the same system used by commercial cleaning contractors. Not a consumer steam cleaner. Not a mop. Professional rotary extraction.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE AND AFTER GALLERY */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Real Results</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              BEFORE AND AFTER.<br /><span className="text-teal-600">THE RF DIFFERENCE.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Real jobs on the Eastern Shore. Every result verified with pH meter after cleaning.</p>
          </div>

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">White Bathroom Tile - Grout Restoration</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-before-white-bathroom-1.jpg`} alt="White bathroom tile before RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-after-white-bathroom.jpg`} alt="White bathroom tile after RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">Vacation Rental Bathroom - Deep Extraction</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-before-tan.jpg`} alt="Hotel bathroom tile before RF cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-during-tan.jpg`} alt="Hotel bathroom tile during RF cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-after-tan.jpg`} alt="Hotel bathroom tile after RF cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">Kitchen Slate Tile - Grout Deep Clean</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-before-kitchen.jpg`} alt="Kitchen tile before RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-after-kitchen.jpg`} alt="Kitchen tile after RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">Entryway Tile - Color Seal Transformation</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-before-entryway.jpg`} alt="Entryway tile before RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/tile-after-entryway.jpg`} alt="Entryway tile after RF cleaning" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              🌴 Get These Results - Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(32px,5vw,64px)"}}>
            READY FOR RF TILE<br /><span className="text-orange-400">AND GROUT CLEANING?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Does Not Survive Here - Serving Maryland and Delaware Eastern Shore</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book Online - Get Instant Quote
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
