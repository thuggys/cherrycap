export default function sitemap() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://cherrycapitalweb.com' 
    : 'http://localhost:3000';

  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // Main sections
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly', 
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9, // Blog section
    },
    {
      url: `${baseUrl}/blog/how-i-build-modern-web-apps`,
      lastModified: '2025-01-16T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/wordpress-isnt-cutting-it-2025`,
      lastModified: '2025-01-15T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/building-pwas-michigan-tourism`,
      lastModified: '2024-12-10T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/local-seo-secrets-2024`,
      lastModified: '2024-12-05T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/real-cost-diy-website-builders`,
      lastModified: '2024-11-28T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Contact section
    },
    {
      url: `${baseUrl}/#tech-stack`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7, // Supporting sections
    },
  ];
} 