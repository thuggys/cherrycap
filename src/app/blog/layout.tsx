import type { Metadata } from "next";
import { portfolioConfig } from "@/lib/portfolioConfig";

export const metadata: Metadata = {
  title: {
    default: "Blog - CherryCapitalWeb",
    template: `%s - CherryCapitalWeb Blog`,
  },
  description: "Real talk about modern web development, local business growth, and why WordPress isn't always the answer. Written by Scott Heney, founder of CherryCapitalWeb.",
  
  // Enhanced SEO keywords for blog
  keywords: [
    "web development blog",
    "next.js tutorials", 
    "local business websites",
    "wordpress alternatives",
    "michigan web developer",
    "modern web development",
    "seo tips",
    "web performance",
    "cherrycapitalweb blog",
    "scott heney blog"
  ],

  // Enhanced metadata for blog section
  other: {
    // Content type
    "content-type": "blog",
    "article-section": "Web Development & Business",
    
    // Local relevance
    "geo.region": "US-MI",
    "service-area": "Michigan, United States",
    
    // Blog-specific
    "blog-category": "Web Development, Local Business, SEO",
    "publication-type": "blog",
    "target-audience": "Local Business Owners, Web Developers",
    
    // Authority signals
    "author": "Scott Heney - CherryCapitalWeb",
    "expertise": "Full Stack Development, Local SEO, Business Growth",
  },

  // Enhanced OpenGraph for blog
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${portfolioConfig.seo.url}/blog`,
    title: "CherryCapitalWeb Blog - Modern Web Development Insights",
    description: "Real talk about modern web development, local business growth, and why WordPress isn't always the answer. Written by Scott Heney.",
    images: [
      {
        url: `${portfolioConfig.seo.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CherryCapitalWeb Blog - Web Development & Business Insights",
      }
    ],
    siteName: "CherryCapitalWeb Blog",
  },

  // Enhanced Twitter metadata for blog
  twitter: {
    card: "summary_large_image",
    title: "CherryCapitalWeb Blog - Modern Web Development Insights",
    description: "Real talk about modern web development, local business growth, and why WordPress isn't always the answer.",
    images: [`${portfolioConfig.seo.url}/og-image.png`],
    creator: portfolioConfig.seo.twitterHandle,
    site: portfolioConfig.seo.twitterHandle,
  },

  // Canonical URL for blog
  alternates: {
    canonical: `${portfolioConfig.seo.url}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 