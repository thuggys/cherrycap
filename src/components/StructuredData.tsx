import Script from 'next/script';

export function StructuredData() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://cherrycapitalweb.com' 
    : 'http://localhost:3000';

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Scott Heney",
    "alternateName": ["Scott", "thuggys"],
    "description": "Full Stack Developer and Founder of CherryCapitalWeb, specializing in modern web solutions that outperform WordPress",
    "url": baseUrl,
    "image": `${baseUrl}/myImage.png`,
    "sameAs": [
      "https://github.com/thuggys",
      "https://www.linkedin.com/in/scott-heney"
    ],
    "jobTitle": "Full Stack Developer & Founder",
    "worksFor": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "CherryCapitalWeb"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beulah",
      "addressRegion": "Michigan",
      "addressCountry": "US"
    },
    "email": "scott@cherrycapitalweb.com",
    "knowsAbout": [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Full Stack Development",
      "Modern Web Solutions",
      "Custom Websites"
    ]
  };

  // Local Business Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": "CherryCapitalWeb",
    "alternateName": "Cherry Capital Web",
    "description": "Professional web development services in Beulah, Michigan. Creating modern, custom websites that outperform WordPress solutions.",
    "url": baseUrl,
    "logo": `${baseUrl}/myImage.png`,
    "founder": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    "employee": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beulah",
      "addressRegion": "MI",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.6344",
      "longitude": "-86.2422"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "44.6344",
        "longitude": "-86.2422"
      },
      "geoRadius": "50000"
    },
    "serviceType": "Web Development",
    "priceRange": "$$",
    "telephone": "Contact via website",
    "email": "scott@cherrycapitalweb.com",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Modern, responsive websites built with Next.js and React"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Full Stack Development",
            "description": "Complete web applications with frontend and backend solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "WordPress Alternative Solutions",
            "description": "High-performance custom solutions that outperform WordPress"
          }
        }
      ]
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Scott Heney - CherryCapitalWeb Portfolio",
    "description": "Professional portfolio showcasing modern web development expertise and CherryCapitalWeb services",
    "publisher": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
} 