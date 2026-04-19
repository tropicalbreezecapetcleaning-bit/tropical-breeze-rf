import { db } from '@/db';
import { cities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const SERVICES: Record<string, {
  name: string;
  slug: string;
  tagline: string;
  price: string;
  priceNum?: string;
  priceCurrency?: string;
  emoji: string;
  rfProcess: string;
  stats: { n: string; l: string }[];
  coastalNote?: string;
  faqs: { q: string; a: string }[];
  otherServices: { name: string; slug: string; emoji: string }[];
}> = {
  'carpet-cleaning': {
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    emoji: '🧼',
    tagline: 'Residue-Free Carpet Cleaning That Stays Clean 3× Longer',
    price: '$99 first room · $50 each additional',
    priceNum: '99.00',
    priceCurrency: 'USD',
    rfProcess: 'Our RF™ process removes dirt AND residue — so carpets stay cleaner up to 3× longer than traditional cleaning. Prochem truckmount + Rotovac Powerwand 360° at 300–500 PSI. Dry in 4–6 hours.',
    stats: [
      { n: '$99', l: 'First Room RF99™' },
      { n: '3×', l: 'Longer Clean' },
      { n: '4–6hr', l: 'Dry Time' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'How long does carpet cleaning take?', a: 'Most rooms take 20–40 minutes. A full home typically takes 2–4 hours.' },
      { q: 'How long until I can walk on the carpet?', a: 'With RF™, carpets are walk-ready in 4–6 hours. Traditional cleaning requires 24–48 hours.' },
      { q: 'Is it safe for pets and children?', a: 'Yes — our RF™ process leaves zero chemical residue. Safe immediately after drying.' },
    ],
    otherServices: [
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'EZ Breeze', slug: 'ez-breeze', emoji: '🌴' },
    ],
  },
  'upholstery': {
    name: 'Upholstery Cleaning',
    slug: 'upholstery',
    emoji: '🛋️',
    tagline: 'Fiber-Safe RF™ Cleaning for Every Sofa, Chair & Sectional',
    price: 'Chairs $50 · Loveseats $75 · Sofas $85',
    priceNum: '50.00',
    priceCurrency: 'USD',
    rfProcess: 'Fiber inspection before every job — we never guess. Pet odor enzyme treatment eliminates odors permanently. RF™ residue-free process on every piece. Dry in 2–4 hours.',
    stats: [
      { n: '$50', l: 'Chairs From' },
      { n: '$85', l: 'Sofas From' },
      { n: '2–4hr', l: 'Dry Time' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'How long does upholstery cleaning take?', a: 'Most pieces take 30–60 minutes. A full sectional may take up to 90 minutes.' },
      { q: 'Is it safe for all fabrics?', a: 'We inspect every piece before cleaning and select the right process for each fabric type.' },
      { q: 'Can you remove pet odors?', a: 'Yes — our enzyme treatment eliminates odor-causing bacteria permanently, not just the smell.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'EZ Breeze', slug: 'ez-breeze', emoji: '🌴' },
    ],
  },
  'tile-grout': {
    name: 'Tile & Grout Cleaning',
    slug: 'tile-grout',
    emoji: '⬜',
    tagline: '1,200+ PSI Rotary Extraction — Orange Stain Specialists',
    price: '$125 per room',
    priceNum: '125.00',
    priceCurrency: 'USD',
    rfProcess: '1,200+ PSI rotary extraction removes years of buildup from grout pores. Eastern Shore iron-rich water leaves orange staining only our mineral-specific treatment can remove. Color seal available.',
    stats: [
      { n: '1,200+', l: 'PSI Extraction' },
      { n: '$125', l: 'Per Room' },
      { n: 'RF™', l: 'Residue-Free' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'Can you restore dark grout lines?', a: 'Yes — our high-pressure rotary extraction removes years of buildup from grout lines and restores original color.' },
      { q: 'What about orange sprinkler stains?', a: 'Orange staining from irrigation water is our Eastern Shore specialty. Our mineral treatment breaks down iron deposits completely.' },
      { q: 'Do you seal grout after cleaning?', a: 'Yes — we offer professional color seal to protect against future staining after cleaning.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'EZ Breeze', slug: 'ez-breeze', emoji: '🌴' },
    ],
  },
  'hardwood': {
    name: 'Hardwood Floor Cleaning',
    slug: 'hardwood',
    emoji: '🪵',
    tagline: 'Low-Moisture RF™ Cleaning — Inspection Before Every Job',
    price: '$1.00 per sq ft · Free inspection',
    priceNum: '1.00',
    priceCurrency: 'USD',
    rfProcess: 'We identify your floor finish type first — polyurethane, oil-based, aluminum oxide, or wax — then apply the exact low-moisture RF™ process it needs. Dry in 1–2 hours, not 24+.',
    stats: [
      { n: '$1.00', l: 'Per Sq Ft' },
      { n: '1–2hr', l: 'Dry Time' },
      { n: 'Free', l: 'Inspection' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'Can you clean all hardwood finishes?', a: 'We clean polyurethane, oil-based, and aluminum oxide finishes. Wax finishes get special dry-method care identified during inspection.' },
      { q: 'What about Eastern Shore humidity?', a: 'High humidity is the #1 enemy of hardwood on the Shore. Our low-moisture RF™ process cleans without adding damaging moisture.' },
      { q: 'How long does hardwood cleaning take?', a: 'Most rooms take 30–60 minutes after inspection. Ready to walk on within 1–2 hours.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'EZ Breeze', slug: 'ez-breeze', emoji: '🌴' },
    ],
  },
  'window-cleaning': {
    name: 'Window Cleaning',
    slug: 'window-cleaning',
    emoji: '🪟',
    tagline: 'Pure Water Window Cleaning — Inside, Outside, Screens & Tracks',
    price: '$13 per window — everything included',
    priceNum: '13.00',
    priceCurrency: 'USD',
    rfProcess: 'Pure water (0 TDS) removes salt-air mineral deposits, hard water staining, and organic film from every pane. Inside + outside + screens + tracks + sills — all for $13 per window.',
    coastalNote: 'Salt air film and ocean spray leave mineral deposits on coastal windows that standard cleaners cannot remove. Our pure water process dissolves sodium and calcium deposits streak-free.',
    stats: [
      { n: '$13', l: 'Per Window' },
      { n: '0 TDS', l: 'Pure Water' },
      { n: '6', l: 'Services Included' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'Does $13 per window include everything?', a: 'Yes — interior glass, exterior glass, screen removal and cleaning, track vacuuming and wiping, and sill wipe-down. No hidden fees.' },
      { q: 'What about hard water and salt-air stains?', a: 'Salt air mineral deposits are our Eastern Shore specialty. Pure water treatment removes calcium, iron, and sodium deposits without scratching.' },
      { q: 'Do you serve vacation rentals?', a: 'Absolutely — window cleaning between guest turnovers is one of our most requested services in beach communities.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'EZ Breeze', slug: 'ez-breeze', emoji: '🌴' },
    ],
  },
  'ez-breeze': {
    name: 'EZ Breeze Cleaning',
    slug: 'ez-breeze',
    emoji: '🌴',
    tagline: 'Vinyl-Safe EZ Breeze Cleaning — Never Ammonia, Never Abrasive',
    price: 'Free assessment · Consultation-based',
    rfProcess: 'EZ Breeze vinyl panels are not glass — they scratch and yellow permanently with the wrong cleaner. We inspect every panel, track, frame, and screen before touching anything. pH-neutral vinyl-safe solutions only.',
    stats: [
      { n: 'Free', l: 'Assessment' },
      { n: 'Vinyl', l: 'Safe Only' },
      { n: 'RF™', l: 'Residue-Free' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'What makes EZ Breeze different from regular windows?', a: 'EZ Breeze panels are vinyl — standard glass cleaners contain ammonia which breaks down vinyl polymers, causing permanent yellowing and brittleness.' },
      { q: 'How often should EZ Breeze be cleaned?', a: 'On the Eastern Shore we recommend 2–3 times per year due to pollen, salt air, and humidity buildup. Golf community homes often benefit from quarterly cleaning.' },
      { q: 'Can you restore yellowed panels?', a: 'In many cases yes — oxidation and UV yellowing can be significantly reduced with our vinyl restoration treatment.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
    ],
  },
  'area-rugs': {
    name: 'Area Rug Cleaning',
    slug: 'area-rugs',
    emoji: '🪄',
    tagline: 'RF™ Area Rug Cleaning — Fiber Inspection Before Every Job',
    price: 'From $75 · Size-based pricing',
    priceNum: '75.00',
    priceCurrency: 'USD',
    rfProcess: 'Area rugs get a fiber inspection first — wool, synthetic, natural fiber, or handmade. RF™ residue-free process safe for all rug types. Pickup and delivery available.',
    stats: [
      { n: 'From $75', l: 'Per Rug' },
      { n: 'Free', l: 'Inspection' },
      { n: 'RF™', l: 'Residue-Free' },
      { n: '365+', l: '5-Star Reviews' },
    ],
    faqs: [
      { q: 'Can you clean all types of area rugs?', a: 'We clean wool, synthetic, natural fiber, and handmade rugs. Each gets a fiber inspection before cleaning begins.' },
      { q: 'Do you offer pickup and delivery?', a: 'Yes — pickup and delivery is available for area rug cleaning. Ask when booking.' },
      { q: 'How long does area rug cleaning take?', a: 'Most area rugs take 30–60 minutes depending on size and fiber type.' },
    ],
    otherServices: [
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning', emoji: '🧼' },
      { name: 'Upholstery Cleaning', slug: 'upholstery', emoji: '🛋️' },
      { name: 'Tile & Grout', slug: 'tile-grout', emoji: '⬜' },
      { name: 'Hardwood Floors', slug: 'hardwood', emoji: '🪵' },
      { name: 'Window Cleaning', slug: 'window-cleaning', emoji: '🪟' },
    ],
  },
};

const COASTAL_CITIES = [
  'rehoboth-beach-de', 'bethany-beach-de', 'fenwick-island-de',
  'ocean-city-md', 'lewes-de', 'bayside-de', 'the-peninsula-de',
  'ocean-pines-md', 'st-michaels-md',
];

interface PageProps {
  params: Promise<{ service: string; location: string }>;
}

export async function generateStaticParams() {
  const allCities = await db.select({ slug: cities.slug }).from(cities);
  const serviceSlugList = Object.keys(SERVICES);
  const params = [];
  for (const city of allCities) {
    for (const service of serviceSlugList) {
      params.push({ service, location: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { service, location } = await params;
  const s = SERVICES[service];
  const cityResult = await db.select().from(cities).where(eq(cities.slug, location)).limit(1);
  const city = cityResult[0];
  if (!s || !city) return {};

  // Unique description — uses localHook + vacation rental/golf flags when available
  const extras = [
    city.hasVacationRentals ? 'Vacation rental turnover specialists.' : '',
    city.hasGolfCommunity ? 'Serving golf community homes.' : '',
    city.localHook ? `${city.localHook}.` : '',
  ].filter(Boolean).join(' ');

  const description = `RF™ ${s.name.toLowerCase()} in ${city.name}, ${city.state}. ${s.tagline}. ${extras} ${s.price}. Prochem truckmount + Rotovac Powerwand 360°. Call 443-856-3244.`.trim();

  const title = `${s.name} in ${city.name}, ${city.state} | Tropical Breeze RF™`;
  const url = `https://tropicalbreezerf.com/services/${service}/${location}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service, location } = await params;
  const s = SERVICES[service];
  const cityResult = await db.select().from(cities).where(eq(cities.slug, location)).limit(1);
  const city = cityResult[0];
  if (!s || !city) notFound();

  const nearbyList: string[] = city.nearbyCities ? JSON.parse(city.nearbyCities) : [];
  const isCoastal = COASTAL_CITIES.includes(location);

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.name} in ${city.name}, ${city.state}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Tropical Breeze RF™",
      telephone: "+1-443-856-3244",
      url: "https://tropicalbreezerf.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Salisbury",
        addressRegion: "MD",
        postalCode: "21801",
        addressCountry: "US",
      },
      ...(city.lat && city.lng ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: Number(city.lat),
          longitude: Number(city.lng),
        },
      } : {}),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: city.avgRating || "5",
        reviewCount: Number(city.reviewCount) > 0 ? city.reviewCount : "365",
        bestRating: "5",
        worstRating: "1",
      },
    },
    serviceType: s.name,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedIn: city.state === "MD" ? "Maryland" : "Delaware",
    },
    description: `RF™ residue-free ${s.name.toLowerCase()} in ${city.name}, ${city.state}. ${s.tagline}.`,
    ...(s.priceNum ? {
      offers: {
        "@type": "Offer",
        price: s.priceNum,
        priceCurrency: s.priceCurrency || "USD",
      },
    } : {}),
  };

  // FAQ schema — includes city name for local uniqueness
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...s.faqs.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
      {
        "@type": "Question",
        name: `Do you serve ${city.name}, ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — ${city.name} is one of our regular service areas. We serve ${city.name} and ${nearbyList.slice(0, 3).join(', ')}${nearbyList.length > 3 ? ' and more' : ''} with the same RF™ standard. Call 443-856-3244 or book online.`,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            {s.emoji} {city.name}, {city.state} · {s.name}
          </div>
          <h1 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(36px,6vw,80px)"}}>
            {s.name.toUpperCase()}<br />
            <span className="text-teal-300">IN {city.name.toUpperCase()},</span><br />
            {city.state}
          </h1>
          {city.localHook && (
            <p className="text-xl text-teal-300 font-bold leading-relaxed max-w-2xl mb-4 italic">
              &ldquo;{city.localHook}&rdquo;
            </p>
          )}
          {isCoastal && s.coastalNote && (
            <div className="bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 rounded-2xl p-4 mb-6 max-w-2xl">
              <p className="text-teal-200 text-sm">🌊 {s.coastalNote}</p>
            </div>
          )}
          <p className="text-lg text-sky-100 leading-relaxed max-w-2xl mb-10">
            {city.localChallenge || `Professional RF™ ${s.name.toLowerCase()} in ${city.name}, ${city.state}. ${s.tagline}. Serving all of ${city.region || city.state}.`}
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              {s.emoji} Book {s.name} in {city.name}
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-5 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {s.stats.map(stat => (
              <div key={stat.n}>
                <div className="text-3xl font-black text-teal-300 leading-none">{stat.n}</div>
                <div className="text-xs text-sky-300 font-semibold tracking-widest uppercase mt-1">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL EXPERTISE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">{city.name}, {city.state} · Local Expertise</span>
              <h2 className="font-black text-[#0a1628] leading-none mb-6" style={{fontSize:"clamp(28px,4vw,48px)"}}>
                {s.name.toUpperCase()} BUILT FOR<br /><span className="text-teal-600">{city.name.toUpperCase()}</span>
              </h2>
              {city.localChallenge && (
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{city.localChallenge}</p>
              )}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{s.rfProcess}</p>
              {city.waterQualityNote && (
                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-4 mb-6">
                  <div className="text-teal-700 font-bold text-sm mb-1">💧 Water Quality Note</div>
                  <p className="text-teal-600 text-sm leading-relaxed">{city.waterQualityNote}</p>
                </div>
              )}
              <div className="space-y-3">
                {[
                  `RF™ residue-free ${s.name.toLowerCase()} — results that last`,
                  `Serving ${city.name} and ${nearbyList.slice(0,2).join(', ')}${nearbyList.length > 2 ? ' and more' : ''}`,
                  "Prochem truckmount + Rotovac Powerwand 360° on every job",
                  "Licensed, insured, locally operated from Salisbury MD",
                  "365+ five-star reviews across the Eastern Shore",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold flex-shrink-0 mt-1">✓</span>
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
                <h3 className="font-black text-[#0a1628] text-xl mb-4">Why {city.name} Chooses RF™</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {city.localChallenge || `${city.name} homeowners face unique challenges from the Eastern Shore's coastal environment. RF™ was built specifically for these conditions.`}
                </p>
                <div className="bg-white rounded-2xl p-4 border border-teal-100">
                  <div className="font-black text-teal-700 text-sm mb-1">Equipment Used</div>
                  <div className="text-teal-600 text-sm">Prochem Truckmount + Rotovac Powerwand 360°</div>
                  <div className="text-teal-500 text-xs mt-1">
                    {service === 'carpet-cleaning' ? '300–500 PSI · 200°F · Dry in 4–6 hours' :
                     service === 'tile-grout' ? '1,200+ PSI rotary extraction · Color seal available' :
                     service === 'window-cleaning' ? '0 TDS pure water · Streak-free · Immediate dry' :
                     service === 'hardwood' ? 'Low-moisture process · Dry in 1–2 hours' :
                     service === 'ez-breeze' ? 'Vinyl-safe solutions only · pH-neutral' :
                     'RF™ residue-free process · Prochem professional grade'}
                  </div>
                </div>
                {city.hasVacationRentals && (
                  <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <div className="text-blue-700 font-bold text-xs mb-1">🏖️ Vacation Rental Ready</div>
                    <div className="text-blue-600 text-xs">Fast dry times keep {city.name} rentals guest-ready between turnovers.</div>
                  </div>
                )}
                {city.hasGolfCommunity && (
                  <div className="mt-4 bg-green-50 rounded-xl p-3 border border-green-100">
                    <div className="text-green-700 font-bold text-xs mb-1">⛳ Golf Community Specialist</div>
                    <div className="text-green-600 text-xs">Regular maintenance schedules for {city.name} golf community properties.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING BANNER */}
      <section className="py-16 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-2">🌸 Spring Offer</p>
            <h2 className="font-black text-white text-3xl">{s.name} in {city.name}</h2>
            <p className="text-orange-100 mt-1 font-bold">{s.price}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/booking" className="bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:bg-orange-50 transition text-lg">Book Online →</Link>
            <a href="tel:4438563244" className="border-2 border-white text-white font-bold px-6 py-4 rounded-full hover:bg-orange-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block mb-4">{city.name} FAQ</span>
            <h2 className="font-black text-[#0a1628] leading-none" style={{fontSize:"clamp(28px,4vw,48px)"}}>
              {s.name.toUpperCase()}<br /><span className="text-teal-600">QUESTIONS ANSWERED</span>
            </h2>
          </div>
          <div className="space-y-4">
            {s.faqs.map(faq => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
                <h3 className="font-black text-[#0a1628] text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
              <h3 className="font-black text-[#0a1628] text-lg mb-3">Do you serve {city.name}, {city.state}?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes — {city.name} is one of our regular service areas. We serve {city.name} and {nearbyList.slice(0, 3).join(', ')}{nearbyList.length > 3 ? ' and more' : ''} with the same RF™ standard. Call 443-856-3244 or book online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEARBY + OTHER SERVICES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {nearbyList.length > 0 && (
            <div className="mb-10 text-center">
              <h2 className="font-black text-[#0a1628] text-2xl mb-4">Also Serving Near {city.name}</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {nearbyList.map((nearby: string) => {
                  const nearbySlug = nearby.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + city.state.toLowerCase();
                  return (
                    <Link key={nearby} href={`/services/${service}/${nearbySlug}`}
                      className="bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                      📍 {s.name} in {nearby}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <div className="text-center">
            <h2 className="font-black text-[#0a1628] text-2xl mb-6">Other RF™ Services in {city.name}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {s.otherServices.map(os => (
                <Link key={os.slug} href={`/services/${os.slug}/${location}`}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all">
                  {os.emoji} {os.name}
                </Link>
              ))}
              <Link href={`/${location}`}
                className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-600 hover:text-white transition-all">
                📍 All Services in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white leading-none mb-6" style={{fontSize:"clamp(32px,5vw,64px)"}}>
            READY FOR RF™ {s.name.toUpperCase()}<br /><span className="text-orange-400">IN {city.name.toUpperCase()}?</span>
          </h2>
          <p className="text-sky-200 text-xl mb-10">Residue Doesn&apos;t Survive Here™ · Serving {city.name} and all of {city.region || city.state}</p>
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
