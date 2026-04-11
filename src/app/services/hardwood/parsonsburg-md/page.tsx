import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardwood Floor Cleaning in Parsonsburg, MD | Tropical Breeze RF",
  description: "Professional hardwood floor cleaning in Parsonsburg, Maryland. Free finish inspection before every job. Serving Wicomico County and surrounding areas. Call 443-856-3244.",
  alternates: {
    canonical: "https://tropicalbreezerf.com/services/hardwood/parsonsburg-md",
  },
};

export default function Page() {
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
            🪵 Parsonsburg, MD · Hardwood Floor Cleaning
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,6vw,80px)"}}>
            HARDWOOD FLOOR CLEANING<br /><span className="text-teal-300">IN PARSONSBURG,</span><br />MD
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mb-6">
            Parsonsburg sits in rural Wicomico County with a mix of farmhouses and newer residential development. Agricultural dust and well water mineral content create challenging cleaning conditions.
          </p>
          <p className="text-lg text-sky-200 leading-relaxed max-w-2xl mb-10">
            Our RF residue-free hardwood floor cleaning uses Low-moisture RF process delivering free finish inspection before every job. Serving Parsonsburg and Wicomico County.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              Book Hardwood Cleaning →
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            <div><div className="text-3xl font-black text-teal-300 leading-none">$1.00 per sq ft</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Starting Price</div></div>
            <div><div className="text-3xl font-black text-teal-300 leading-none">1-2 hours</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Dry Time</div></div>
            <div><div className="text-3xl font-black text-teal-300 leading-none">RF</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">Residue-Free</div></div>
            <div><div className="text-3xl font-black text-teal-300 leading-none">365+</div><div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">5-Star Reviews</div></div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Parsonsburg, MD · Local Expertise</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(28px,4vw,48px)"}}>
                HARDWOOD FLOOR CLEANING BUILT FOR<br /><span className="text-teal-600">PARSONSBURG</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">Parsonsburg sits in rural Wicomico County with a mix of farmhouses and newer residential development. Agricultural dust and well water mineral content create challenging cleaning conditions.</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">We use professional Low-moisture RF process — the same equipment used by top commercial cleaners, not consumer rentals. Every job is pH-verified to confirm zero residue remains.</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span><p className="text-gray-700">RF residue-free process — stays cleaner 3x longer than traditional cleaning</p></div>
                <div className="flex items-start gap-3"><span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span><p className="text-gray-700">Free finish inspection before every job</p></div>
                <div className="flex items-start gap-3"><span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span><p className="text-gray-700">Serving Parsonsburg and Salisbury, Pittsville, Hebron</p></div>
                <div className="flex items-start gap-3"><span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span><p className="text-gray-700">Licensed, insured, and locally operated from Salisbury MD</p></div>
              </div>
            </div>
            <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
              <h3 className="font-black text-[#0a1628] text-xl mb-4">Why Parsonsburg Homeowners Choose RF</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Parsonsburg sits in rural Wicomico County with a mix of farmhouses and newer residential development. Agricultural dust and well water mineral content create challenging cleaning conditions.</p>
              <div className="bg-white rounded-2xl p-4 border border-teal-100">
                <div className="font-black text-teal-700 text-sm mb-1">Equipment Used</div>
                <div className="text-teal-600 text-sm">Low-moisture RF process</div>
                <div className="text-teal-500 text-xs mt-1">Low-moisture only · Prochem Truckmount · Dry in 1-2 hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-2xl mb-4">Serving Parsonsburg and Surrounding Areas</h2>
          <p className="text-gray-500 mb-8">We serve all of Wicomico County including Salisbury, Pittsville, Hebron and the surrounding Eastern Shore.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black px-10 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all">
            Book Hardwood Floor Cleaning in Parsonsburg →
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-2xl mb-6">Other RF Services in Parsonsburg</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/carpet-cleaning/parsonsburg-md" className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">🧼 Carpet Cleaning</Link>
            <Link href="/services/upholstery/parsonsburg-md" className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">🛋️ Upholstery Cleaning</Link>
            <Link href="/services/tile-grout/parsonsburg-md" className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">⬜ Tile and Grout Cleaning</Link>
            <Link href="/services/window-cleaning/parsonsburg-md" className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">🪟 Window Cleaning</Link>
            <Link href="/parsonsburg-md" className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-600 hover:text-white transition-all">
              📍 All Services in Parsonsburg
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(32px,5vw,64px)"}}>
            READY FOR RF HARDWOOD FLOOR CLEANING<br /><span className="text-orange-400">IN PARSONSBURG?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Does Not Survive Here · Serving Parsonsburg and Wicomico County</p>
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
