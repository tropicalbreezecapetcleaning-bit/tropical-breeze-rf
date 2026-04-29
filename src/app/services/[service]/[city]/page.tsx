import { Metadata } from "next"
import { neon } from "@neondatabase/serverless"
import { notFound } from "next/navigation"
import Link from "next/link"

export const revalidate = 3600

interface Props {
  params: Promise<{ service: string; city: string }>
}

async function getContent(service: string, city: string) {
  const dbUrl = process.env.BREEZE_DB_URL
  if (!dbUrl) return null
  try {
    const sql = neon(dbUrl)
    const slug = `services/${service}/${city}`
    const rows = await sql.query("SELECT * FROM seo_content WHERE slug = $1 AND status = 'published' LIMIT 1", [slug])
    return rows[0] || null
  } catch (e) {
    console.error("DB error:", e)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, city } = await params
  const data = await getContent(service, city)
  if (!data) return { title: "Not Found" }
  return {
    title: data.title || `Residue Free ${service} Cleaning in ${city} | Tropical Breeze RF`,
    description: data.meta_description || "",
    alternates: { canonical: `https://tropicalbreezerf.com/services/${service}/${city}` },
  }
}

export default async function ServiceCityPage({ params }: Props) {
  const { service, city } = await params
  const data = await getContent(service, city)
  if (!data) notFound()

  const cityName = city.replace(/-md$|-de$/, "").split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const serviceName = service.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#004d5a] to-[#006978] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500 bg-opacity-20 border border-teal-400 border-opacity-30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            RF™ Residue-Free · {cityName}
          </div>
          <h1 className="font-black text-white text-4xl md:text-6xl leading-none mb-6">
            {serviceName} in<br /><span className="text-teal-300">{cityName}</span>
          </h1>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-4 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              🌴 Book Now — RF99™ $99
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <style>{`
            .rf-content h1 { font-size: 2rem; font-weight: 900; color: #0a1628; margin-bottom: 1rem; line-height: 1.2; }
            .rf-content h2 { font-size: 1.5rem; font-weight: 900; color: #0a1628; margin: 2rem 0 1rem; border-left: 4px solid #0097A7; padding-left: 1rem; }
            .rf-content p { color: #4b5563; line-height: 1.8; margin-bottom: 1rem; }
            .rf-content .callout { padding: 1.5rem; border-radius: 0.75rem; margin: 1.5rem 0; }
            .rf-content .callout.warning { background: #fff7ed; border: 1px solid #fed7aa; }
            .rf-content .callout.science { background: #f0fdfa; border: 1px solid #99f6e4; }
            .rf-content .process-step { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; margin-bottom: 0.75rem; }
            .rf-content .step-num { background: #0097A7; color: white; font-weight: 900; padding: 0.5rem 0.75rem; border-radius: 0.375rem; font-size: 0.875rem; flex-shrink: 0; }
            .rf-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
            .rf-content th { background: #0a1628; color: white; padding: 0.75rem 1rem; text-align: left; font-weight: 700; }
            .rf-content td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; color: #374151; }
            .rf-content tr:nth-child(even) td { background: #f9fafb; }
            .rf-content .identity-cta { background: linear-gradient(135deg, #0a1628, #004d5a); color: white; padding: 2rem; border-radius: 1rem; text-align: center; margin: 2rem 0; }
            .rf-content .identity-cta a { display: inline-block; background: linear-gradient(to right, #f97316, #ea580c); color: white; font-weight: 900; padding: 0.875rem 2rem; border-radius: 9999px; margin: 0.5rem; text-decoration: none; }
            .rf-content .faq-item { border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.25rem; margin-bottom: 0.75rem; }
            .rf-content .faq-item strong { color: #0a1628; display: block; margin-bottom: 0.5rem; font-size: 0.95rem; }
            .rf-content .faq-item p { color: #6b7280; font-size: 0.875rem; margin: 0; }
            .rf-content .nearby { background: #f9fafb; border-radius: 0.5rem; padding: 1rem; margin-top: 2rem; font-size: 0.875rem; }
            .rf-content .nearby a { color: #0097A7; text-decoration: underline; }
          `}</style>
          <div className="rf-content" dangerouslySetInnerHTML={{ __html: data.content || "" }} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0a1628] to-[#004d5a] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-white text-3xl mb-4">Ready to Book in {cityName}?</h2>
          <p className="text-sky-200 mb-8">RF99™ Starter — First room $99. Stays cleaner 3× longer.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg px-10 py-4 rounded-full hover:-translate-y-1 transition-all">
              🌴 Book Online Now
            </Link>
            <a href="tel:4438563244" className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-opacity-20 transition-all">
              📞 443-856-3244
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}