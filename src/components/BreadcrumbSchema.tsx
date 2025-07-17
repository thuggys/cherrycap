import Script from 'next/script';

export function BreadcrumbSchema() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://cherrycapitalweb.com' 
    : 'http://localhost:3000';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "About",
        "item": `${baseUrl}/#about`
      },
      {
        "@type": "ListItem",
        "position": 3, 
        "name": "Experience",
        "item": `${baseUrl}/#experience`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Projects", 
        "item": `${baseUrl}/#projects`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": `${baseUrl}/#contact`
      }
    ]
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
} 