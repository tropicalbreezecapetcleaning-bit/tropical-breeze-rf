import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(req: NextRequest) {
  const dbUrl = process.env.BREEZE_DB_URL
  if (!dbUrl) return NextResponse.json({ error: "No BREEZE_DB_URL" })
  try {
    const sql = neon(dbUrl)
    const rows = await sql("SELECT slug, status FROM seo_content WHERE status='published' LIMIT 3")
    return NextResponse.json({ success: true, rows, dbUrl: dbUrl.substring(0, 30) })
  } catch (e) {
    return NextResponse.json({ error: String(e) })
  }
}