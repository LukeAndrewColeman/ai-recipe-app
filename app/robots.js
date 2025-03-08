import { headers } from 'next/headers';

export default function robots() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
