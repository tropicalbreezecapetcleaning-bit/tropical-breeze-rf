import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residue-Free Cleaning Guide | Eastern Shore MD & DE | Tropical Breeze RF™",
  description:
    "Expert guides on residue-free cleaning, Eastern Shore home care, salt air windows, EZ Breeze panels, vacation rental turnover, and tile & grout restoration across Maryland and Delaware.",
  alternates: {
    canonical: "https://tropicalbreezerf.com/blog",
  },
  openGraph: {
    title: "The RF™ Cleaning Guide | Tropical Breeze RF™",
    description:
      "Expert guides on residue-free cleaning, Eastern Shore home care, salt air windows, EZ Breeze panels, and vacation rental turnover across MD & DE.",
    url: "https://tropicalbreezerf.com/blog",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "The RF™ Cleaning Guide",
  description: "Expert guides on residue-free cleaning, Eastern Shore home care, and surface restoration across Maryland and Delaware.",
  url: "https://tropicalbreezerf.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Tropical Breeze RF™",
    url: "https://tropicalbreezerf.com",
    logo: { "@type": "ImageObject", url: "https://tropicalbreezerf.com/logo.png" },
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Why Your Carpet Gets Dirty So Fast After Cleaning",
      url: "https://tropicalbreezerf.com/blog/why-carpet-gets-dirty-so-fast",
      datePublished: "2026-04-19",
      author: { "@type": "Organization", name: "Tropical Breeze RF™" },
    },
    {
      "@type": "BlogPosting",
      headline: "Orange Grout Lines on the Eastern Shore: Cause and Fix",
      url: "https://tropicalbreezerf.com/blog/orange-grout-eastern-shore",
      datePublished: "2026-04-19",
      author: { "@type": "Organization", name: "Tropical Breeze RF™" },
    },
    {
      "@type": "BlogPosting",
      headline: "Vacation Rental Cleaning Checklist: Eastern Shore MD & DE",
      url: "https://tropicalbreezerf.com/blog/vacation-rental-cleaning-checklist",
      datePublished: "2026-04-19",
      author: { "@type": "Organization", name: "Tropical Breeze RF™" },
    },
    {
      "@type": "BlogPosting",
      headline: "EZ Breeze Cleaning Mistakes That Permanently Damage Panels",
      url: "https://tropicalbreezerf.com/blog/ez-breeze-cleaning-mistakes",
      datePublished: "2026-04-19",
      author: { "@type": "Organization", name: "Tropical Breeze RF™" },
    },
    {
      "@type": "BlogPosting",
      headline: "Salt Air and Your Windows: Why Coastal Cleaning Is Different",
      url: "https://tropicalbreezerf.com/blog/salt-air-windows-eastern-shore",
      datePublished: "2026-04-19",
      author: { "@type": "Organization", name: "Tropical Breeze RF™" },
    },
  ],
};

const featuredPost = {
  slug: "why-carpet-gets-dirty-so-fast",
  title: "Why Your Carpet Gets Dirty So Fast After Cleaning",
  excerpt: "68% of traditionally cleaned carpets re-soil within 2 weeks. The cause is soap residue left behind by traditional methods — acting as a dirt magnet. Here is the science and the only permanent fix.",
  category: "Carpet Care",
  readTime: "6 min read",
  icon: "🧼",
  tags: ["Carpet", "Residue", "Cleaning Science", "Eastern Shore"],
};

const posts = [
  {
    slug: "orange-grout-eastern-shore",
    title: "Orange Grout Lines on the Eastern Shore: Cause and Fix",
    excerpt: "Orange grout staining is caused by iron-rich Eastern Shore groundwater from irrigation systems. Learn why standard cleaning fails and how 1,200+ PSI rotary extraction removes it permanently.",
    category: "Tile & Grout",
    readTime: "5 min read",
    icon: "⬜",
    tags: ["Tile", "Grout", "Iron Staining", "Eastern Shore"],
  },
  {
    slug: "vacation-rental-cleaning-checklist",
    title: "Vacation Rental Cleaning Checklist: Eastern Shore MD & DE",
    excerpt: "Fast turnovers, salt air, high guest expectations. How RF™ residue-free cleaning with 4–6 hour dry times keeps Eastern Shore vacation rentals guest-ready without losing a rental night.",
    category: "Vacation Rentals",
    readTime: "7 min read",
    icon: "🏖️",
    tags: ["Vacation Rental", "Ocean City", "Rehoboth Beach"],
  },
  {
    slug: "ez-breeze-cleaning-mistakes",
    title: "EZ Breeze Cleaning Mistakes That Permanently Damage Panels",
    excerpt: "Windex, pressure washing, abrasive scrubbing — the common mistakes that permanently scratch, yellow, and damage EZ Breeze vinyl panels. What to use instead.",
    category: "EZ Breeze",
    readTime: "5 min read",
    icon: "🌴",
    tags: ["EZ Breeze", "Vinyl", "Golf Communities"],
  },
  {
    slug: "salt-air-windows-eastern-shore",
    title: "Salt Air and Your Windows: Why Coastal Cleaning Is Different",
    excerpt: "Salt air carries minerals that bond to glass and cannot be removed with standard cleaners. Only pure water (0 TDS) has the ionic attraction to pull mineral deposits from coastal windows.",
    category: "Window Cleaning",
    readTime: "5 min read",
    icon: "🪟",
    tags: ["Windows", "Salt Air", "Coastal", "Eastern Shore"],
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* HERO */}
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
            Expert guides on residue-free cleaning, Eastern Shore home care, salt air windows, EZ Breeze panels, and vacation rental turnover across Maryland and Delaware.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Link href={`/blog/${featuredPost.slug}`}
            className="block group bg-gradient-to-br from-[#0a1628] to-[#004d5a] rounded-3xl p-10 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              {featuredPost.tags.map(tag => (
                <span key={tag} className="bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
              ))}
              <span className="text-sky-400 text-xs font-semibold self-center">{featuredPost.readTime}</span>
            </div>
            <h2 className="font-black text-white text-3xl md:text-5xl leading-tight mb-6 group-hover:text-teal-200 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-sky-200 text-lg leading-relaxed mb-8 max-w-2xl">{featuredPost.excerpt}</p>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 rounded-full group-hover:bg-orange-400 transition-colors">
              Read the Full Guide →
            </div>
          </Link>

          {/* GRID POSTS */}
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="text-4xl mb-4">{post.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-black text-[#0a1628] text-xl leading-tight mb-3 group-hover:text-teal-700 transition-colors flex-1">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS RESIDUE-FREE CALLOUT */}
      <section className="py-16 px-6 bg-teal-50 border-t border-b border-teal-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-[#0a1628] text-3xl mb-4">What Is Residue-Free Cleaning?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            RF™ is the only residue-free cleaning process on Maryland and Delaware&apos;s Eastern Shore. Traditional cleaning leaves soap residue that attracts new dirt within days. RF™ removes the dirt AND the cleaning agent — so surfaces stay cleaner up to 3× longer.
          </p>
          <Link href="/residue-free" className="inline-flex items-center gap-2 bg-teal-600 text-white font-black px-8 py-4 rounded-full hover:bg-teal-700 transition">
            🔬 Read the Full RF™ Science Guide →
          </Link>
        </div>
      </section>

      {/* CTA */}
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
