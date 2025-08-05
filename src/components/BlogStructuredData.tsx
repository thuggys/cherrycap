import { portfolioConfig } from "@/lib/portfolioConfig";

export function BlogStructuredData() {
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${portfolioConfig.seo.url}/blog#blog`,
    "url": `${portfolioConfig.seo.url}/blog`,
    "name": "CherryCapitalWeb Blog",
    "headline": "Modern Web Development & Local Business Insights",
    "description": "Real talk about modern web development, local business growth, and why WordPress isn't always the answer. Written by Scott Heney, founder of CherryCapitalWeb.",
    "inLanguage": "en-US",
    "author": {
      "@type": "Person",
      "@id": `${portfolioConfig.seo.url}#scott-heney`,
      "name": "Scott Heney",
      "url": portfolioConfig.seo.url,
      "sameAs": [
        "https://www.linkedin.com/in/scott-heney/",
        "https://github.com/thuggys"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${portfolioConfig.seo.url}#cherrycapitalweb`,
      "name": "CherryCapitalWeb",
      "url": portfolioConfig.seo.url,
      "founder": {
        "@id": `${portfolioConfig.seo.url}#scott-heney`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${portfolioConfig.seo.url}/blog`
    },
    "keywords": [
      "web development",
      "next.js",
      "local business",
      "wordpress alternatives",
      "michigan web developer",
      "modern web development",
      "seo tips",
      "web performance"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Web Development",
        "description": "Modern web development techniques and best practices"
      },
      {
        "@type": "Thing", 
        "name": "Local Business Marketing",
        "description": "Digital marketing strategies for local Michigan businesses"
      },
      {
        "@type": "Thing",
        "name": "Next.js Development",
        "description": "Advanced Next.js development and optimization techniques"
      }
    ],
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${portfolioConfig.seo.url}#website`
    }
  };

  // Website breadcrumb for blog
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": portfolioConfig.seo.url
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Blog",
        "item": `${portfolioConfig.seo.url}/blog`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
} 