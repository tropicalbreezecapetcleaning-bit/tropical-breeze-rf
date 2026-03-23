import { db } from '@/db';
import { cities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

interface CityPageProps {
  params: Promise<{ city: string }>;
}
export async function generateStaticParams() {
  const allCities = await db.select({ slug: cities.slug }).from(cities);
  return allCities.map((city) => ({ city: city.slug }));
}
export async function generateMetadata({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = await db.select().from(cities).where(eq(cities.slug, citySlug)).limit(1);
  if (!city[0]) return {};
  return {
    title: city[0].metaTitle || `RF™ Cleaning in ${city[0].name}, ${city[0].state} | Tropical Breeze RF™`,
    description: city[0].metaDescription || `Residue-free cleaning in ${city[0].name}. Call 443-856-3244.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const result = await db.select().from(cities).where(eq(cities.slug, citySlug)).limit(1);
  const city = result[0];
  if (!city) notFound();

  const nearbyList: string[] = city.nearbyCities ? JSON.parse(city.nearbyCities) : [];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-900 to-teal-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-mono uppercase tracking-widest mb-3">
            Tropical Breeze RF™ · {city.state} · {city.region}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {city.h1Headline || `Residue-Free Cleaning in ${city.name}, ${city.state}`}
          </h1>
          <p className="text-xl text-sky-100 mb-8 italic">"{city.localHook}"</p>
          <div className="flex flex-wrap gap-4">
            <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">
              Book RF™ Service
            </a>
            <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">
              Call 443-856-3244
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-sky-900 mb-4">The {city.name} Cleaning Challenge</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{city.localChallenge}</p>
          {city.waterQualityNote && (
            <div className="mt-6 border-l-4 border-teal-500 pl-4 text-gray-600 italic">
              💧 {city.waterQualityNote}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-sky-900 mb-8">RF™ Services in {city.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {city.offersCarpet && <ServiceCard icon="🧼" name="Carpet Cleaning" price="From $99" />}
            {city.offersUpholstery && <ServiceCard icon="🛋️" name="Upholstery Cleaning" price="From $50" />}
            {city.offersTileGrout && <ServiceCard icon="⬜" name="Tile & Grout" price="Free estimate" />}
            {city.offersHardwood && <ServiceCard icon="🪵" name="Hardwood Floors" price="Inspection first" />}
            {city.offersWindow && <ServiceCard icon="🪟" name="Window Cleaning" price="$13/window" />}
            {city.offersEzBreeze && <ServiceCard icon="🌴" name="EZ Breeze" price="Book consult" />}
            {city.offersAreaRugs && <ServiceCard icon="🔲" name="Area Rugs" price="Free estimate" />}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-mono uppercase tracking-widest mb-2">Limited Offer</p>
          <h2 className="text-4xl font-bold mb-4">RF99™ — First Room $99</h2>
          <p className="text-xl text-teal-100 mb-8">
            Professional RF™ carpet cleaning for one room up to 200 sq ft — plus deodorizing treatment OR carpet protector. Perfect for your {city.name} home.
          </p>
          <a href="tel:4438563244" className="bg-white text-teal-700 font-bold px-10 py-4 rounded-full text-lg hover:bg-teal-50 transition">
            Call to Book RF99™ in {city.name}
          </a>
        </div>
      </section>

      {nearbyList.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">Also Serving Near {city.name}</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyList.map((nearby) => (
                <span key={nearby} className="bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-medium">
                  {nearby}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-sky-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for RF™ Clean in {city.name}?</h2>
        <p className="text-sky-200 mb-8 text-lg">Residue Doesn't Survive Here™</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-8 py-3 rounded-full transition">
            Book Online
          </a>
          <a href="tel:4438563244" className="border border-white hover:bg-white hover:text-sky-900 text-white font-bold px-8 py-3 rounded-full transition">
            Call 443-856-3244
          </a>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, name, price }: { icon: string; name: string; price: string }) {
  return (
    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center hover:shadow-md transition">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold text-sky-900 text-sm">{name}</div>
      <div className="text-teal-600 text-xs mt-1">{price}</div>
    </div>
  );
}