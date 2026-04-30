import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.tropicalbreezerf.com';

const CITY_SLUGS = [
  'ocean-city-md', 'fenwick-island-de', 'bethany-beach-de', 'rehoboth-beach-de',
  'lewes-de', 'ocean-pines-md', 'berlin-md', 'easton-md', 'st-michaels-md',
  'cambridge-md', 'oxford-md', 'trappe-md', 'milford-de', 'milton-de',
  'salisbury-md', 'fruitland-md', 'princess-anne-md', 'delmar-md',
  'snow-hill-md', 'pocomoke-city-md', 'georgetown-de', 'seaford-de',
  'the-peninsula-de', 'bayside-de', 'heritage-shores-de', 'crisfield-md',
  'mardela-springs-md', 'hebron-md', 'pittsville-md', 'willards-md',
  'quantico-md', 'selbyville-de', 'millsboro-de', 'dagsboro-de',
  'bridgeville-de', 'laurel-de', 'long-neck-de', 'dewey-beach-de',
  'millville-de', 'ocean-view-de', 'frankford-de', 'harrington-de',
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
    { url: `${BASE_URL}/residue-free`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/golf-communities`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const serviceLocationPages: MetadataRoute.Sitemap = CITY_SLUGS.flatMap((slug) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/services/${service}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...serviceLocationPages];
}