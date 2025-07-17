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