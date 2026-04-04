import Link from "next/link";

export default function Blog() {
  const posts = [
    { title: "What is Residue-Free Cleaning? The Complete Science Guide", excerpt: "Traditional cleaning leaves soap residue that re-attracts dirt within days. Learn the chemistry, health data, and science behind the RF™ process.", category: "RF™ Science", readTime: "8 min read", href: "/residue-free", icon: "🔬", tags: ["Residue-Free", "Chemistry", "Health"] },
    { title: "Why Carpet Cleaning Makes Your Carpets Dirty Faster", excerpt: "68% of traditionally cleaned carpets re-soil within 2 weeks. Here is the science behind the residue cycle — and how to break it permanently.", category: "Carpet Care", readTime: "5 min read", href: "/carpet-cleaning", icon: "🧼", tags: ["Carpet", "Residue", "Health"] },
    { title: "Salt Air, Mineral Deposits, and Your Eastern Shore Windows", excerpt: "Ocean-facing homes on the Eastern Shore deal with a unique enemy: salt air mineral deposits. Here is why standard window cleaning fails.", category: "Window Cleaning", readTime: "4 min read", href: "/windows", icon: "🪟", tags: ["Windows", "Coastal", "Salt Air"] },
    { title: "EZ Breeze Panels: The One Cleaning Mistake That Ruins Them", excerpt: "EZ Breeze vinyl panels are not glass — they scratch easily with the wrong cleaner. What you need to know before your next cleaning.", category: "EZ Breeze", readTime: "4 min read", href: "/ez-breeze", icon: "🌴", tags: ["EZ Breeze", "Vinyl", "Golf Communities"] },
    { title: "The Vacation Rental Owners Cleaning Checklist", excerpt: "Fast turnovers, guest expectations, and no time for 24-hour dry times. How RF™ cleaning is built for the vacation rental market.", category: "Vacation Rentals", readTime: "6 min read", href: "/golf-communities", icon: "🏖️", tags: ["Vacation Rental", "Turnover", "Beach"] },
    { title: "Pet Odor in Carpet: Why Masking Does Not Work", excerpt: "Enzyme treatment vs deodorizing spray — the difference between eliminating pet odor and hiding it. What actually works and why.", category: "Pet Care", readTime: "5 min read", href: "/carpet-cleaning", icon: "🐾", tags: ["Pets", "Odor", "Enzyme Treatment"] },
    { title: "Orange Grout Lines: What Causes Them and How to Remove Them", excerpt: "Orange staining on tile grout is one of the most common complaints on the Eastern Shore. It is iron from irrigation water. Here is how we fix it.", category: "Tile and Grout", readTime: "4 min read", href: "/tile-grout", icon: "⬜", tags: ["Tile", "Grout", "Iron Staining"] },
    { title: "Hardwood Floors on the Eastern Shore: The Humidity Problem", excerpt: "High humidity is the number one enemy of hardwood floors in Maryland and Delaware. Low-moisture cleaning is essential. Here is why.", category: "Hardwood", readTime: "5 min read", href: "/hardwood", icon: "🪵", tags: ["Hardwood", "Humidity", "Eastern Shore"] },
    { title: "Prochem Hot Water Extraction: Why Professional Equipment Matters", excerpt: "Not all carpet cleaning equipment is equal. Learn why Prochem truck-mount systems with Rotovac Powerwand deliver results consumer machines cannot.", category: "RF™ Science", readTime: "5 min read", href: "/residue-free", icon: "🔧", tags: ["Prochem", "Equipment", "Professional"] },
    { title: "Indoor Air Quality: Why Your Carpet Is Your Biggest Filter", excerpt: "The EPA estimates indoor air is 2-10x more polluted than outdoor air. Your carpet is the primary reservoir — and the primary solution when cleaned correctly.", category: "Health and Air Quality", readTime: "6 min read", href: "/residue-free", icon: "🌬️", tags: ["Air Quality", "Health", "EPA Data"] },
    { title: "Golf Community Home Maintenance: A Seasonal Checklist", excerpt: "The Peninsula, Bayside, Heritage Shores — golf community homes have unique maintenance needs. Here is the seasonal cleaning calendar.", category: "Golf Communities", readTime: "7 min read", href: "/golf-communities", icon: "⛳", tags: ["Golf", "HOA", "Seasonal"] },
    { title: "How to Prepare Your Home for a Professional Cleaning", excerpt: "Moving furniture, pre-vacuuming, protecting valuables — what you should and should not do before your RF™ cleaning appointment.", category: "Tips", readTime: "3 min read", href: "/booking", icon: "📋", tags: ["Preparation", "Tips", "Booking"] },
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
            📚 Knowledge Base
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            THE RF™<br /><span className="text-teal-300">CLEANING GUIDE</span>
          </h1>
          <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto">
            Expert guides on residue-free cleaning, Eastern Shore home care, health data, Prochem equipment, and everything you need to protect your home.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Link href="/residue-free" className="block group bg-gradient-to-br from-[#0a1628] to-[#004d5a] rounded-3xl p-10 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              {["Residue-Free","Chemistry","Health","RF™ Process"].map((tag) => (
                <span key={tag} className="bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
              ))}
              <span className="text-sky-400 text-xs font-semibold">8 min read</span>
            </div>
            <h2 className="font-black text-white text-3xl md:text-5xl leading-tight mb-6 group-hover:text-teal-200 transition-colors">
              What is Residue-Free Cleaning? The Complete Science Guide
            </h2>
            <p className="text-sky-200 text-lg leading-relaxed mb-8 max-w-2xl">The definitive guide to residue-free cleaning — chemistry, health data, Prochem equipment specs, and why RF™ outperforms every traditional method.</p>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 rounded-full group-hover:bg-orange-400 transition-colors">
              Read the Full Guide →
            </div>
          </Link>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Link key={post.title} href={post.href} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="text-4xl mb-4">{post.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-black text-[#0a1628] text-lg leading-tight mb-3 group-hover:text-teal-700 transition-colors flex-1">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,5vw,64px)"}}>
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
