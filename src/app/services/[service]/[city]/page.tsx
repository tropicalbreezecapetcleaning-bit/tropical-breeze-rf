import { Metadata } from "next"
import { neon } from "@neondatabase/serverless"
import { notFound } from "next/navigation"

export const revalidate = 3600

interface Props {
  params: Promise<{ service: string; city: string }>
}

async function getContent(service: string, city: string) {
  try {
    const sql = neon(process.env.BREEZE_DB_URL!)
    const slug = `services/${service}/${city}`
    const rows = await sql(
      "SELECT * FROM seo_content WHERE slug = $1 AND status = 'published' LIMIT 1",
      [slug]
    )
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
  }
}

export default async function ServiceCityPage({ params }: Props) {
  const { service, city } = await params
  const data = await getContent(service, city)
  if (!data) notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article dangerouslySetInnerHTML={{ __html: data.content || "" }} />
    </main>
  )
}