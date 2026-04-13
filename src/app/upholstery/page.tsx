import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upholstery Cleaning | Tropical Breeze RF",
  description: "Professional upholstery cleaning on the Eastern Shore. Sofas, chairs, dining chairs, sectionals. Pet odor enzyme treatment available. Serving Maryland and Delaware. Call 443-856-3244.",
  alternates: { canonical: "https://tropicalbreezerf.com/upholstery" },
};

const CDN = "https://d1chim18wmcawu.cloudfront.net/images";

export default function UpholsteryPage() {
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
            🛋️ Upholstery Cleaning · Eastern Shore MD and DE
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            UPHOLSTERY<br /><span className="text-teal-300">CLEANING</span>
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-6">
            Sofas, chairs, dining chairs, sectionals, and more. Fiber-specific RF process with pet odor enzyme treatment available. Dry in 2-4 hours.
          </p>
          <p className="text-lg text-sky-200 leading-relaxed max-w-2xl mb-10">
            We identify your fabric type before touching anything. Every upholstery piece gets a fiber-safe RF treatment that removes soil and odor without leaving sticky residue behind.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              Book Upholstery Cleaning
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            <div><div className="text-4xl font-black text-teal-300 leading-none">$50</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Chairs From</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">$85</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Sofas From</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">2-4hr</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Dry Time</div></div>
            <div><div className="text-4xl font-black text-teal-300 leading-none">365+</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">5-Star Reviews</div></div>
          </div>
        </div>
      </section>

      {/* WHY RF */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Fiber-Safe RF Process</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(28px,4vw,52px)"}}>
                EVERY FABRIC.<br /><span className="text-teal-600">ONE STANDARD.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Traditional upholstery cleaning leaves soap residue deep in fabric fibers. That residue attracts new soil within days — your furniture looks dirty again faster than it should. The RF process removes the soil AND the cleaning agent, leaving fibers genuinely clean.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Pet odors require enzyme treatment, not just surface cleaning. Our enzyme process breaks down the organic compounds causing the odor at the molecular level — eliminating it permanently rather than masking it with fragrance.
              </p>
              <div className="space-y-3">
                {[
                  "Fiber inspection before every job — we never guess",
                  "Pet odor enzyme treatment eliminates not masks",
                  "RF residue-free process on every piece",
                  "Dry in 2-4 hours — back on your furniture same day",
                  "Sofas, loveseats, chairs, dining chairs, sectionals",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-black text-[#0a1628] text-lg mb-4">Upholstery Pricing</h3>
                <div className="space-y-3">
                  {[
                    {name: "Chair", price: "$50"},
                    {name: "Loveseat", price: "$75"},
                    {name: "Sofa", price: "$85"},
                    {name: "Sectional", price: "Quote on-site"},
                    {name: "Dining Chairs", price: "$25 each"},
                    {name: "Pet Odor Enzyme Treatment", price: "+ $30"},
                    {name: "Fabric Protector", price: "+ $20/piece"},
                  ].map(s => (
                    <div key={s.name} className="flex justify-between items-center py-2 border-b border-teal-100 last:border-0">
                      <span className="text-gray-700 font-medium text-sm">{s.name}</span>
                      <span className="text-teal-700 font-black text-sm">{s.price}</span>
                    </div>
                  ))}
                </div>
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
              DINING CHAIRS.<br /><span className="text-teal-600">COMPLETELY RESTORED.</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Full set of dining chairs restored to like-new condition with RF upholstery cleaning.</p>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-2 rounded-full mb-6">BEFORE - Stained dining chair fabric</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-before-1.jpg`} alt="Dining chair before RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-before-2.jpg`} alt="Dining chair 2 before RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-before-3.jpg`} alt="Dining chair 3 before RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">BEFORE</div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full mb-6">DURING - RF extraction in progress</div>
            <div className="max-w-sm">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-during.jpg`} alt="Upholstery cleaning in progress with RF extraction wand" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">DURING</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold px-4 py-2 rounded-full mb-6">AFTER - Clean restored fabric</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-after-1.jpg`} alt="Dining chair after RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-after-2.jpg`} alt="Dining chair 2 after RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`${CDN}/upholstery-after-3.jpg`} alt="Dining chair 3 after RF upholstery cleaning" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full">AFTER</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              🛋️ Book Upholstery Cleaning
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(32px,5vw,64px)"}}>
            READY FOR RF<br /><span className="text-orange-400">UPHOLSTERY CLEANING?</span>
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
