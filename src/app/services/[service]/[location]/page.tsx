import { db } from '@/db';
import { cities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

const SERVICES: Record<string, {
  name: string;
  slug: string;
  tagline: string;
  price: string;
  rfProcess: string;
  coastalNote?: string;
  faqs: { q: string; a: string }[];
}> = {
  'carpet-cleaning': {
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    tagline: 'Residue-Free Carpet Cleaning That Stays Clean 3x Longer',
    price: '$99 first room · $50 each additional',
    rfProcess: 'Our RF™ process removes dirt AND residue — so carpets stay cleaner up to 3x longer than traditional cleaning.',
    faqs: [
      { q: 'How long does carpet cleaning take?', a: 'Most rooms take 20-40 minutes. A full home typically takes 2-4 hours.' },
      { q: 'How long until I can walk on the carpet?', a: 'With RF™, carpets are walk-ready in 4-6 hours. Traditional cleaning requires 24-48 hours.' },
      { q: 'Is it safe for pets and children?', a: 'Yes — our RF™ process leaves zero chemical residue. Safe immediately after drying.' },
    ]
  },
  'upholstery': {
    name: 'Upholstery Cleaning',
    slug: 'upholstery',
    tagline: 'Residue-Free Upholstery Cleaning for Sofas, Chairs & More',
    price: 'Chairs $50 · Loveseats $75 · Sofas $85',
    rfProcess: 'Fiber-aware process that deep cleans without leaving sticky residue behind.',
    faqs: [
      { q: 'How long does upholstery cleaning take?', a: 'Most pieces take 30-60 minutes. A full sectional may take up to 90 minutes.' },
      { q: 'Is it safe for all fabrics?', a: 'We inspect every piece before cleaning and select the right process for each fabric type.' },
      { q: 'Can you remove pet odors?', a: 'Yes — our enzyme treatment eliminates odor-causing bacteria, not just the smell.' },
    ]
  },
  'tile-grout': {
    name: 'Tile & Grout Cleaning',
    slug: 'tile-grout',
    tagline: 'Tile & Grout Restoration That Goes Beyond the Surface',
    price: '$125 per room · Free estimate',
    rfProcess: '1,200+ PSI extraction removes years of buildup from grout lines. Orange sprinkler stains and calcium deposits are our Eastern Shore specialty.',
    faqs: [
      { q: 'Can you restore dark grout lines?', a: 'Yes — our high-pressure extraction removes years of buildup from grout lines.' },
      { q: 'What about orange sprinkler stains?', a: 'Orange staining from irrigation water is our Eastern Shore specialty. Our mineral treatment breaks down iron deposits.' },
      { q: 'Do you seal grout after cleaning?', a: 'Yes — we offer professional grout sealing to protect against future staining.' },
    ]
  },
  'hardwood': {
    name: 'Hardwood Floor Cleaning',
    slug: 'hardwood',
    tagline: 'Hardwood Cleaning That Starts With Inspection — Not Assumptions',
    price: '$1.00 per sq ft · Inspection first',
    rfProcess: 'We identify your floor finish type first — polyurethane, oil-based, or wax — then apply the exact process it needs.',
    faqs: [
      { q: 'Can you clean all hardwood finishes?', a: 'We clean polyurethane, oil-based, and aluminum oxide finishes. Wax finishes get special care during inspection.' },
      { q: 'What about Eastern Shore humidity?', a: 'High humidity is the #1 enemy of hardwood on the Shore. Our low-moisture RF™ process cleans without adding damaging moisture.' },
      { q: 'How long does hardwood cleaning take?', a: 'Most rooms take 30-60 minutes after inspection. Ready to walk on within 1-2 hours.' },
    ]
  },
  'window-cleaning': {
    name: 'Window Cleaning',
    slug: 'window-cleaning',
    tagline: 'Streak-Free Window Cleaning Inside & Out',
    price: '$13 per window · Inside + outside + screens + tracks',
    rfProcess: 'We clean interior and exterior glass, screens, tracks, and sills — leaving nothing behind but a perfect view.',
    coastalNote: 'Salt air film and ocean spray leave mineral deposits on coastal windows that standard cleaners cannot touch. Our pure water process removes salt-air buildup streak-free.',
    faqs: [
      { q: 'Do you clean both inside and outside?', a: 'Yes — every window is cleaned inside and outside including screens, tracks, and sills.' },
      { q: 'What about hard water and salt-air stains?', a: 'Salt air mineral deposits are our Eastern Shore specialty. We use pure water treatment to remove these without scratching.' },
      { q: 'Do you serve vacation rentals?', a: 'Absolutely — window cleaning between guest turnovers is one of our most requested services in beach communities.' },
    ]
  },
  'ez-breeze': {
    name: 'EZ Breeze Cleaning',
    slug: 'ez-breeze',
    tagline: 'EZ Breeze Enclosure Cleaning — The Right Process for Vinyl Panels',
    price: 'Consultation-based · Free assessment',
    rfProcess: 'EZ Breeze vinyl panels are not glass — they scratch easily with the wrong cleaner. We inspect every panel, track, frame, and screen before touching anything.',
    faqs: [
      { q: 'What makes EZ Breeze different from regular windows?', a: 'EZ Breeze panels are vinyl — standard glass cleaners scratch and yellow them permanently.' },
      { q: 'How often should EZ Breeze be cleaned?', a: 'On the Eastern Shore we recommend 2-3 times per year due to pollen, salt air, and humidity buildup.' },
      { q: 'Can you restore yellowed panels?', a: 'In many cases yes — oxidation and yellowing can be reduced with our vinyl restoration treatment.' },
    ]
  },
  'area-rugs': {
    name: 'Area Rug Cleaning',
    slug: 'area-rugs',
    tagline: 'Professional Area Rug Cleaning — Residue-Free',
    price: 'Free estimate · Size-based pricing',
    rfProcess: 'Area rugs get a fiber inspection first to determine the right cleaning method for wool, synthetic, or natural fibers.',
    faqs: [
      { q: 'Can you clean all types of area rugs?', a: 'We clean wool, synthetic, natural fiber, and handmade rugs. Each gets a fiber inspection first.' },
      { q: 'Do you pick up area rugs?', a: 'We clean area rugs on-site. For delicate or antique rugs we discuss the best approach during the free estimate.' },
      { q: 'How long does area rug cleaning take?', a: 'Most area rugs take 30-60 minutes depending on size and fiber type.' },
    ]
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
  const serviceData = SERVICES[service];
  const cityResult = await db.select().from(cities).where(eq(cities.slug, location)).limit(1);
  const city = cityResult[0];
  if (!serviceData || !city) return {};
  return {
    title: `${serviceData.name} in ${city.name}, ${city.state} | Residue-Free Standard | Tropical Breeze RF™`,
    description: `Professional RF™ ${serviceData.name.toLowerCase()} in ${city.name}, ${city.state}. ${serviceData.tagline}. ${serviceData.price}. Call 443-856-3244.`,
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service, location } = await params;
  const serviceData = SERVICES[service];
  const cityResult = await db.select().from(cities).where(eq(cities.slug, location)).limit(1);
  const city = cityResult[0];
  if (!serviceData || !city) notFound();

  const nearbyList: string[] = city.nearbyCities ? JSON.parse(city.nearbyCities) : [];
  const isCoastal = COASTAL_CITIES.includes(location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tropical Breeze RF™",
    "description": `RF™ certified ${serviceData.name.toLowerCase()} in ${city.name}, ${city.state}`,
    "url": `https://tropicalbreezerf.com/services/${service}/${location}`,
    "telephone": "+14438563244",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.state,
      "addressCountry": "US"
    },
    ...(city.lat && city.lng ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": city.lat,
        "longitude": city.lng
      }
    } : {}),
    "areaServed": { "@type": "City", "name": city.name },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "219"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">
            Tropical Breeze RF™ · {city.name}, {city.state}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {serviceData.name} in {city.name}, {city.state}
          </h1>
          <p className="text-xl text-sky-100 mb-4">{serviceData.tagline}</p>
          {city.localHook && (
            <p className="text-sky-200 italic mb-6">"{city.localHook}"</p>
          )}
          {isCoastal && serviceData.coastalNote && (
            <div className="bg-teal-800 bg-opacity-50 rounded-xl p-4 mb-8 border border-teal-500">
              <p className="text-teal-100 text-sm">🌊 {serviceData.coastalNote}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">
              Book in {city.name}
            </a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">
              Call 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-teal-600 text-white text-center">
        <p className="text-teal-200 text-sm font-mono uppercase tracking-widest mb-2">Pricing</p>
        <h2 className="text-2xl font-bold">{serviceData.price}</h2>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-6">The RF™ Difference in {city.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{serviceData.rfProcess}</p>
          {city.localChallenge && (
            <div className="bg-sky-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-4">
              <h3 className="font-bold text-sky-900 mb-2">The {city.name} Challenge</h3>
              <p className="text-gray-600">{city.localChallenge}</p>
            </div>
          )}
          {city.waterQualityNote && (
            <div className="border-l-4 border-sky-300 pl-4 text-gray-600 italic">
              💧 {city.waterQualityNote}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-8">{serviceData.name} FAQ — {city.name}</h2>
          <div className="space-y-6">
            {serviceData.faqs.map((faq, i) => (
              <div key={i} className="border-b border-sky-100 pb-6">
                <h3 className="font-bold text-sky-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
            <div className="border-b border-sky-100 pb-6">
              <h3 className="font-bold text-sky-900 mb-2">Do you serve {city.name}, {city.state}?</h3>
              <p className="text-gray-600">
                Yes — {city.name} is one of our regular service areas. We serve {city.name} and {nearbyList.slice(0, 3).join(', ')} with the same RF™ standard. Call 443-856-3244 or book online.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-teal-600 text-white text-center">
        <p className="text-teal-200 text-sm font-mono uppercase tracking-widest mb-2">Limited Offer</p>
        <h2 className="text-4xl font-bold mb-4">RF99™ — First Room $99</h2>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
          Professional RF™ carpet cleaning for one room up to 200 sq ft — plus deodorizing treatment OR carpet protector.
        </p>
        <a href="tel:4438563244" className="bg-white text-teal-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-50 transition">
          Call to Book in {city.name}
        </a>
      </section>

      {nearbyList.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">Also Serving Near {city.name}</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyList.map((nearby) => {
                const nearbySlug = nearby.toLowerCase().replace(/\s+/g, '-') + '-' + city.state.toLowerCase();
                return (
                  <a key={nearby} href={`/services/${service}/${nearbySlug}`}
                    className="bg-sky-50 hover:bg-teal-50 border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-medium transition">
                    {serviceData.name} in {nearby}
                  </a>
                );
              })}
              
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ {serviceData.name} in {city.name}?</h2>
        <p className="text-sky-200 mb-8 text-lg">Residue Doesn't Survive Here™ · Serving {city.name}, {city.state} and surrounding areas</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-10 py-4 rounded-full text-lg transition">Book Online</a>
          <a href="tel:4438563244" className="border-2 border-white hover:bg-white hover:text-sky-900 text-white font-bold px-10 py-4 rounded-full text-lg transition">Call 443-856-3244</a>
        </div>
      </section>
    </main>
  );
}
