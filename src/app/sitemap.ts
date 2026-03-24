export const dynamic = 'force-static';
import { db } from '@/db';
import { cities } from '@/db/schema';
import { MetadataRoute } from 'next';

const SERVICES = [
  'carpet-cleaning',
  'upholstery',
  'tile-grout',
  'hardwood',
  'window-cleaning',
  'ez-breeze',
  'area-rugs',
];

const BASE_URL = 'https://tropicalbreezerf.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allCities = await db.select({ slug: cities.slug }).from(cities);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/booking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/carpet-cleaning`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/upholstery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tile-grout`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/hardwood`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/windows`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ez-breeze`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const cityPages: MetadataRoute.Sitemap = allCities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = allCities.flatMap((city) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/services/${service}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...cityPages, ...serviceLocationPages];
}