import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { cities } from './schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const coordinates = [
  { slug: "salisbury-md", lat: "38.3607", lng: "-75.5994" },
  { slug: "ocean-city-md", lat: "38.3365", lng: "-75.0849" },
  { slug: "rehoboth-beach-de", lat: "38.7209", lng: "-75.0774" },
  { slug: "bethany-beach-de", lat: "38.5398", lng: "-75.0577" },
  { slug: "fenwick-island-de", lat: "38.4510", lng: "-75.0538" },
  { slug: "lewes-de", lat: "38.7745", lng: "-75.1393" },
  { slug: "milton-de", lat: "38.7726", lng: "-75.3102" },
  { slug: "georgetown-de", lat: "38.6901", lng: "-75.3860" },
  { slug: "seaford-de", lat: "38.6418", lng: "-75.6110" },
  { slug: "milford-de", lat: "38.9126", lng: "-75.4277" },
  { slug: "the-peninsula-de", lat: "38.5504", lng: "-75.1596" },
  { slug: "bayside-de", lat: "38.4732", lng: "-75.0821" },
  { slug: "heritage-shores-de", lat: "38.7154", lng: "-75.6044" },
  { slug: "nutters-crossing-md", lat: "38.3704", lng: "-75.6221" },
  { slug: "berlin-md", lat: "38.3226", lng: "-75.2177" },
  { slug: "ocean-pines-md", lat: "38.3974", lng: "-75.1644" },
  { slug: "cambridge-md", lat: "38.5632", lng: "-76.0788" },
  { slug: "easton-md", lat: "38.7743", lng: "-76.0760" },
  { slug: "st-michaels-md", lat: "38.7851", lng: "-76.2238" },
  { slug: "princess-anne-md", lat: "38.2026", lng: "-75.6930" },
  { slug: "crisfield-md", lat: "37.9829", lng: "-75.8577" },
  { slug: "snow-hill-md", lat: "38.1774", lng: "-75.3927" },
  { slug: "pocomoke-city-md", lat: "38.0757", lng: "-75.5677" },
  { slug: "fruitland-md", lat: "38.3243", lng: "-75.6235" },
  { slug: "delmar-md-de", lat: "38.4568", lng: "-75.5777" },
  { slug: "pittsville-md", lat: "38.3954", lng: "-75.4110" },
  { slug: "parsonsburg-md", lat: "38.4032", lng: "-75.4874" },
  { slug: "bishopville-md", lat: "38.4110", lng: "-75.1821" },
];

async function updateCoordinates() {
  console.log("📍 Adding coordinates to all cities...");
  for (const city of coordinates) {
    await db.update(cities).set({
      lat: city.lat,
      lng: city.lng,
    }).where(eq(cities.slug, city.slug));
    console.log(`✅ ${city.slug}`);
  }
  console.log("🏁 Done.");
  process.exit(0);
}

updateCoordinates().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});