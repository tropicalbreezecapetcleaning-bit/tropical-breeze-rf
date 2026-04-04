import Link from "next/link";

export default function GolfCommunities() {
  const communities = [
    { name: "The Peninsula", location: "Millsboro, DE", slug: "the-peninsula-de", description: "Jack Nicklaus Signature private course on Indian River Bay. 800 acres of luxury homes where RF™ is the only acceptable cleaning standard.", tags: ["Private Community", "Jack Nicklaus", "Bay Views"], highlight: "Bay and fairway view EZ Breeze specialists" },
    { name: "Bayside Resort", location: "Selbyville, DE", slug: "bayside-de", description: "Delaware's first Jack Nicklaus Signature course. Waterfront vacation homes on Assawoman Bay — perfect for RF™ turnovers between guests.", tags: ["Vacation Rentals", "Waterfront", "Bay Views"], highlight: "Fast-turnaround rental cleaning" },
    { name: "Heritage Shores", location: "Bridgeville, DE", slug: "heritage-shores-de", description: "Championship 7,005-yard course at the center of Delaware's premier active adult community. Permanent residents with high standards.", tags: ["Active Adult", "Championship Course"], highlight: "Priority scheduling for residents" },
    { name: "Nutters Crossing", location: "Salisbury, MD", slug: "nutters-crossing-md", description: "27 acres of ponds, 200,000+ plants, eight bridges. Wicomico County's premier golf community — our home market.", tags: ["Home Market", "Wicomico County"], highlight: "Same-day service available" },
    { name: "Eagle's Landing", location: "Berlin, MD", slug: "berlin-md", description: "Maryland's number one rated golf course — 7,003 yards with salt marshes and tidal pools. Coastal humidity demands residue-free cleaning.", tags: ["MD #1 Rated", "Salt Marsh Views"], highlight: "Coastal humidity specialists" },
    { name: "Bear Trap Dunes", location: "Ocean View, DE", slug: "bethany-beach-de", description: "27 championship holes near Bethany Beach. Vacation rentals and second homes needing fast-turnaround RF™ cleaning between guests.", tags: ["Beach Community", "27 Holes"], highlight: "Vacation rental turnover experts" },
    { name: "Ocean Pines", location: "Ocean Pines, MD", slug: "ocean-pines-md", description: "Large waterfront community near Ocean City with diverse housing and active HOA. Year-round residents and seasonal vacation homes.", tags: ["Waterfront", "HOA Community"], highlight: "Year-round service available" },
    { name: "Baywood Greens", location: "Long Neck, DE", slug: "georgetown-de", description: "Augusta of the North — 27 acres of ponds, 200,000+ plants, eight bridges. Retirement and vacation homes where RF™ makes the biggest difference.", tags: ["Augusta of the North", "Lakefront"], highlight: "Retirement community specialists" },
  ];

  const services = [
    { icon: "🌴", name: "EZ Breeze Cleaning", desc: "Our most requested golf community service. Vinyl-safe process restores your fairway view streak-free.", href: "/ez-breeze", stat: "Vinyl-safe only" },
    { icon: "🪟", name: "Window Cleaning", desc: "Pure water process removes salt-air mineral deposits — $13/window inside and outside.", href: "/windows", stat: "$13/window" },
    { icon: "🧼", name: "Carpet Cleaning", desc: "RF99™ first room $99. Prochem truckmount with Rotovac Powerwand 360 at 300-500 PSI.", href: "/carpet-cleaning", stat: "From $99" },
    { icon: "🛋️", name: "Upholstery Cleaning", desc: "Furniture cleaning for every fabric type. Pet odor enzyme treatment available.", href: "/upholstery", stat: "From $50" },
    { icon: "⬜", name: "Tile and Grout", desc: "Orange sprinkler stains and calcium deposits — our Eastern Shore specialty.", href: "/tile-grout", stat: "$125/room" },
    { icon: "🪵", name: "Hardwood Floors", desc: "Low-moisture process safe for all hardwood finishes. Inspection before every job.", href: "/hardwood", stat: "$1.00/sq ft" },
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
            ⛳ Golf Community Specialists
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            RF™ CLEANING FOR<br /><span className="text-teal-300">EVERY GOLF COMMUNITY</span><br />ON THE SHORE.
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto mb-10">
            From The Peninsula to Heritage Shores — we serve every golf community in Maryland and Delaware with the same RF™ standard your home deserves.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              ⛳ Book RF™ Service
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-2">🌸 Spring Offer — Ends April 30</p>
            <h2 className="font-black text-white text-4xl">RF99™ Spring Pack — $99</h2>
            <p className="text-orange-100 mt-2">First room carpet cleaning + deodorizing treatment OR carpet protector.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/booking" className="bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:bg-orange-50 transition text-lg">Book Online →</Link>
            <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-6 py-4 rounded-full hover:bg-orange-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Why RF™ for Golf Communities</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              BUILT FOR THE WAY<br /><span className="text-teal-600">YOU LIVE HERE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "4-6 Hour Dry Time", desc: "Rental turnovers cannot wait 24-48 hours. RF™ means same-day turnaround — never lose a booking night." },
              { icon: "🐾", title: "Pet Safe", desc: "Golf community homeowners love their dogs. RF™ leaves zero chemical residue — safe for every pet immediately after drying." },
              { icon: "🌴", title: "EZ Breeze Vinyl Specialists", desc: "We use only vinyl-safe solutions — never ammonia-based glass cleaners that yellow and degrade panels." },
              { icon: "📅", title: "Same-Day Available", desc: "Last-minute rental turnover? Pre-showing clean? Call before 11am and we are often there same day." },
              { icon: "🔧", title: "Prochem Truckmount Equipment", desc: "Professional Prochem truck-mount with Rotovac Powerwand 360 — the same equipment used by top commercial cleaners." },
              { icon: "🛡️", title: "Licensed and Insured", desc: "Fully licensed and insured for every property type — HOA documentation available on request." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all group">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-[#0a1628] mb-2 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">Communities We Serve</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              EVERY GOLF COMMUNITY<br /><span className="text-teal-600">ON THE EASTERN SHORE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((community) => (
              <div key={community.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all group">
                <div className="flex flex-wrap gap-2 mb-3">
                  {community.tags.map((tag) => (
                    <span key={tag} className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">{tag}</span>
                  ))}
                </div>
                <h3 className="font-black text-[#0a1628] text-xl mb-1 group-hover:text-teal-700 transition-colors">{community.name}</h3>
                <p className="text-teal-600 text-sm font-semibold mb-3">{community.location}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{community.description}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">⚡ {community.highlight}</span>
                  <Link href="/booking" className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">RF™ Services for Golf Homes</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(32px,4vw,56px)"}}>
              EVERY SURFACE.<br /><span className="text-teal-600">ONE STANDARD.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.name} href={s.href} className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-black text-[#0a1628] text-lg mb-2 group-hover:text-teal-700 transition-colors">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{s.stat}</span>
                  <span className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform">Book →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,72px)"}}>
            READY FOR RF™ CLEAN<br /><span className="text-orange-400">IN YOUR COMMUNITY?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Doesn't Survive Here™ · Serving every golf community on the Eastern Shore</p>
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
