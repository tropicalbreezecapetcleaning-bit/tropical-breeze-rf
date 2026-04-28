import { Metadata } from "next"
import { neon } from "@neondatabase/serverless"
import { notFound } from "next/navigation"

const sql = neon(process.env.BREEZE_DB_URL!)

export const revalidate = 3600

interface Props {
  params: Promise<{ service: string; city: string }>
}

async function getContent(service: string, city: string) {
  const rows = await sql(
    "SELECT * FROM seo_content WHERE service = $1 AND city = $2 AND status = 'published' LIMIT 1",
    [service, city]
  )
  return rows[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, city } = await params
  const data = await getContent(service, city)
  if (!data) return { title: "Not Found" }
  return {
    title: data.title || `Residue Free ${service} Cleaning in ${city} | Tropical Breeze RF`,
    description: data.meta_description || "",
    alternates: {
      canonical: `https://tropicalbreezerf.com/services/${service}/${city}`,
    },
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