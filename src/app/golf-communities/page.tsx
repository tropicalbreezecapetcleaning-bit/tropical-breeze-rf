export default function GolfCommunities() {
  const communities = [
    {
      name: "The Peninsula",
      location: "Millsboro, DE",
      description: "Jack Nicklaus Signature private course on Indian River Bay. 800 acres of luxury homes where RF™ is the only acceptable cleaning standard.",
      tags: ["Private Community", "Jack Nicklaus Design", "Bay Views"],
      slug: "the-peninsula-de",
    },
    {
      name: "Bayside Resort",
      location: "Selbyville, DE",
      description: "Delaware's first Jack Nicklaus Signature course. Waterfront vacation homes on Assawoman Bay — ideal for RF™ cleaning and EZ Breeze window service.",
      tags: ["Vacation Rentals", "Waterfront Views", "Bay Views"],
      slug: "bayside-de",
    },
    {
      name: "Heritage Shores",
      location: "Bridgeville, DE",
      description: "Championship 7,005-yard course at the center of Delaware's premier active adult community. Permanent residents with high standards who notice the RF™ difference.",
      tags: ["Active Adult", "Championship Course"],
      slug: "heritage-shores-de",
    },
    {
      name: "Nutters Crossing",
      location: "Salisbury, MD",
      description: "The Augusta of the North — 27 acres of ponds, 200,000+ plants, eight bridges. Wicomico County's premier golf community.",
      tags: ["Home Market", "Wicomico County"],
      slug: "nutters-crossing-md",
    },
    {
      name: "Eagle's Landing",
      location: "Berlin, MD",
      description: "Maryland's #1 rated golf course — 7,003 yards with salt marshes and tidal pools. Coastal humidity demands residue-free cleaning.",
      tags: ["MD #1 Rated", "Salt Marsh Views"],
      slug: "berlin-md",
    },
    {
      name: "Bear Trap Dunes",
      location: "Ocean View, DE",
      description: "27 championship holes near Bethany Beach. Vacation rentals and second homes needing fast-turnaround RF™ cleaning.",
      tags: ["Beach Community", "27 Holes"],
      slug: "bethany-beach-de",
    },
    {
      name: "Glen Riddle",
      location: "Berlin, MD",
      description: "Man O' War and War Admiral — two championship courses through racetrack history and tidal marshes. Large residential community spanning both courses.",
      tags: ["36 Holes", "Man O War & War Admiral"],
      slug: "berlin-md",
    },
    {
      name: "Rum Pointe",
      location: "Berlin, MD",
      description: "Spectacular Pete & P.B. Dye seaside links above Sinepuxent Bay. On-site rentals and resort homes with frequent turnovers.",
      tags: ["Seaside Links", "Resort Rentals"],
      slug: "berlin-md",
    },
    {
      name: "Ocean City Golf Club",
      location: "Berlin, MD",
      description: "36 holes — Newport Bay and Seaside Course. At the heart of Berlin's golf corridor with marsh and bay vistas on every hole.",
      tags: ["36 Holes", "Newport Bay Views"],
      slug: "berlin-md",
    },
    {
      name: "Baywood Greens",
      location: "Long Neck, DE",
      description: "Augusta of the North — 27 acres of ponds, 200,000+ plants, eight bridges. Retirement and vacation homes where RF™ makes the biggest visual difference.",
      tags: ["Augusta of the North", "Lakefront Homes"],
      slug: "georgetown-de",
    },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">
            Golf Community Specialists
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            RF™ Cleaning for Every Golf Community on the Eastern Shore
          </h1>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            From The Peninsula to Heritage Shores — we serve every golf community in Maryland and Delaware with the same RF™ standard your home deserves.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">
              Book RF™ Service
            </a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">
              Call 443-856-3244
            </a>
          </div>
        </div>
      </section>

      {/* RF99 OFFER */}
      <section className="py-12 px-6 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">RF99™ Spring Pack — $99</h2>
        <p className="text-teal-100 mb-6 text-lg">Professional RF™ carpet cleaning for one room up to 200 sq ft + deodorizing treatment OR carpet protector.</p>
        <a href="tel:4438563244" className="bg-white text-teal-700 font-bold px-8 py-3 rounded-full hover:bg-teal-50 transition">
          Call to Book RF99™
        </a>
      </section>

      {/* WHY GOLF COMMUNITIES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Why Golf Community Homes Choose RF™</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "⚡", title: "4–6 Hour Dry Time", desc: "Golf community rentals turn over fast. Our 4–6 hour dry time means you never lose a booking night." },
              { icon: "🐾", title: "Pet Safe", desc: "Golf communities love their dogs. Our RF™ process leaves zero chemical residue — completely safe for every pet." },
              { icon: "💰", title: "Protects Your Investment", desc: "RF™ cleaning extends carpet life by years — not months — protecting your single biggest investment." },
              { icon: "🪟", title: "EZ Breeze Specialists", desc: "Those fairway views and bay panoramas are worth protecting. We clean EZ Breeze panels streak-free, inside and out." },
              { icon: "📅", title: "Same-Day Available", desc: "Last-minute rental turnover? Pre-showing clean? Call before 11am and we're often there same day." },
              { icon: "🛡️", title: "Licensed & Insured", desc: "Golf communities move fast — and so do we. Licensed, insured, and reliable every time." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-sky-50 rounded-xl border border-sky-100">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-sky-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-sm font-mono uppercase tracking-widest mb-3 text-center">Communities We Serve</p>
          <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Every Golf Community on the Eastern Shore</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((community) => (
              <div key={community.name} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition">
                <div className="flex flex-wrap gap-2 mb-3">
                  {community.tags.map((tag) => (
                    <span key={tag} className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-sky-900 text-lg mb-1">{community.name}</h3>
                <p className="text-teal-600 text-sm font-medium mb-3">{community.location}</p>
                <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                <div className="flex gap-3">
                  <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-4 py-2 rounded-full text-sm transition">
                    Book RF™ Service →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES FOR GOLF */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">RF™ Services for Golf Community Homes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🧼", name: "Carpet Cleaning", price: "From $99" },
              { icon: "🛋️", name: "Upholstery", price: "From $50" },
              { icon: "🪟", name: "Window Cleaning", price: "$13/window" },
              { icon: "🌴", name: "EZ Breeze", price: "Book consult" },
              { icon: "⬜", name: "Tile & Grout", price: "Free estimate" },
              { icon: "🪵", name: "Hardwood", price: "Inspection first" },
            ].map((s) => (
              <div key={s.name} className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center hover:shadow-md transition">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-semibold text-sky-900 text-sm">{s.name}</div>
                <div className="text-teal-600 text-xs mt-1">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ Clean in Your Golf Community?</h2>
        <p className="text-sky-200 mb-8 text-lg">Residue Doesn't Survive Here™ · Serving every golf community on the Eastern Shore</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>

    </main>
  );
}