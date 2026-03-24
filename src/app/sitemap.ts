import { MetadataRoute } from 'next';

const BASE_URL = 'https://tropicalbreezerf.com';

const CITY_SLUGS = [
  'salisbury-md', 'ocean-city-md', 'rehoboth-beach-de', 'bethany-beach-de',
  'fenwick-island-de', 'lewes-de', 'milton-de', 'georgetown-de', 'seaford-de',
  'milford-de', 'the-peninsula-de', 'bayside-de', 'heritage-shores-de',
  'nutters-crossing-md', 'berlin-md', 'ocean-pines-md', 'cambridge-md',
  'easton-md', 'st-michaels-md', 'princess-anne-md', 'crisfield-md',
  'snow-hill-md', 'pocomoke-city-md', 'fruitland-md', 'delmar-md-de',
  'pittsville-md', 'parsonsburg-md', 'bishopville-md',
];

const SERVICES = [
  'carpet-cleaning', 'upholstery', 'tile-grout', 'hardwood',
  'window-cleaning', 'ez-breeze', 'area-rugs',
];

export default function sitemap(): MetadataRoute.Sitemap {
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

  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = CITY_SLUGS.flatMap((slug) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/services/${service}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...cityPages, ...serviceLocationPages];
}