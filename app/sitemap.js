import { headers } from 'next/headers';
import { VALID_CUISINES } from './cuisines/[cuisine]/page';

export default async function sitemap() {
  // Get the host from the headers
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';

  // Determine protocol (use HTTPS for production, HTTP for local)
  const protocol = host.includes('localhost') ? 'http' : 'https';

  // Base URL constructed dynamically
  const baseUrl = `${protocol}://${host}`;

  // Core static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/selector`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipebook`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Generate cuisine pages
  const cuisinePages = VALID_CUISINES.map((cuisine) => ({
    url: `${baseUrl}/cuisines/${cuisine}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Combine all pages
  return [...staticPages, ...cuisinePages];
}
