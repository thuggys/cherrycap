export default function robots() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://cherrycapitalweb.com' 
    : 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 