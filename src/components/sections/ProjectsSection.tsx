import React from "react";
import { ExternalLink, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function ProjectsSection() {
  return (
    <section className="border-x full-line-bottom relative">
      <h2 className="pl-4 text-3xl font-semibold relative full-line-bottom">
        Featured Projects
      </h2>
      <div className="relative ">
        <Accordion type="single" collapsible className="w-full">
          {projects.map((project) => (
            <AccordionItem key={project.id} value={`item-${project.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 p-4 w-full">
                  <div className="flex flex-1 flex-col gap-2 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      <span>Launched {project.launchDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="size-3" />
                        Visit Site
                      </a>
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Project Overview</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.overview}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {project.results && (
                    <div>
                      <h4 className="font-medium mb-2">Results & Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.results}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default ProjectsSection;

const projects = [
  {
    id: 1,
    title: "Hill Top Soda Shoppe",
    type: "Local Business",
    live: "https://www.hilltopsodashoppe.com/",
    launchDate: "2024",
    description: "Modern website for Benzonia's beloved ice cream and coffee shop, featuring summer menu showcases and event management.",
    overview: "Hill Top Soda Shoppe needed a fresh, modern web presence to match their delightful summer atmosphere. Built a responsive site that captures the joy of their handcrafted ice cream and coffee experience while making it easy for customers to explore menus and find location details.",
    features: [
      "Interactive summer menu display with ice cream flavors",
      "Responsive design optimized for mobile customers",
      "Event calendar integration for summer activities",
      "Location finder with contact information",
      "Clean, cheerful design matching the shop's atmosphere",
      "Fast loading times for better user experience"
    ],
    technologies: [
      "Next.js",
      "TypeScript", 
      "Tailwind CSS",
      "Responsive Design",
      "Performance Optimization"
    ],
    results: "Delivered a vibrant, user-friendly website that perfectly captures Hill Top's summer joy while providing customers with easy access to menus and location information."
  },
  {
    id: 2,
    title: "Lynn & Perin Mercantile",
    type: "Business Website",
    live: "https://www.lynnandperin.com/",
    launchDate: "2024",
    description: "Sophisticated business website for artisanal foods and premium products, featuring multiple business integrations and product showcases.",
    overview: "Lynn & Perin needed a premium web presence to showcase their curated collection of gourmet products. Created an elegant website that reflects their high-quality offerings while integrating their family of businesses including Victoria's Floral Design.",
    features: [
      "Professional product showcase and catalog display",
      "Multi-business integration (floral, catering services)",
      "Clean, elegant design reflecting premium brand",
      "Newsletter subscription management",
      "Mobile-optimized browsing experience",
      "Business hours and contact integration",
      "Family business connections and cross-promotion"
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Business Integration", 
      "Content Management",
      "Responsive Design",
      "Tailwind CSS"
    ],
    results: "Successfully launched a sophisticated business website that elevated their brand presence and better showcases their artisanal product offerings and family of businesses."
  },
  {
    id: 3,
    title: "Victoria's Floral Weddings",
    type: "Service Business",
    live: "https://www.victoriasfloralweddings.com/",
    launchDate: "2024",
    description: "Elegant wedding planning website featuring portfolio galleries, service coordination, and client testimonials for Northern Michigan weddings.",
    overview: "Victoria's Floral Weddings required a stunning website to showcase their wedding planning expertise and floral arrangements. Built an elegant platform that highlights their 4.9-star rating and captures the beauty of their work through compelling galleries.",
    features: [
      "Professional portfolio gallery with wedding photos",
      "Service breakdown (coordination, planning, floristry)",
      "Client testimonial integration with star ratings",
      "Contact forms for wedding consultations", 
      "Mobile-responsive design for on-the-go browsing",
      "SEO optimization for local wedding searches",
      "Social proof with 'The Knot' verification display"
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Image Optimization",
      "Form Management",
      "SEO Optimization",
      "Tailwind CSS"
    ],
    results: "Created a beautiful, conversion-focused website that effectively showcases their wedding expertise and 4.9-star reputation, leading to increased consultation bookings."
  },
  {
    id: 4,
    title: "Tim Smith Construction LLC",
    type: "Construction Business", 
    live: "https://www.timsmithconstructionllc.com/",
    launchDate: "2025",
    description: "Professional construction company website showcasing quality craftsmanship and project portfolios throughout Northern Michigan.",
    overview: "Tim Smith Construction needed a professional web presence that reflected their quality craftsmanship and attention to detail. Developed a clean, construction-focused site that builds trust and showcases their expertise in Northern Michigan.",
    features: [
      "Project portfolio with high-quality construction photos",
      "Professional service breakdown and capabilities",
      "Contact forms for project consultations",
      "Business hours and location information",
      "Mobile-optimized for field use",
      "Professional branding and logo integration",
      "SEO optimized for local construction searches"
    ],
    technologies: [
      "Next.js",
      "TypeScript", 
      "Image Galleries",
      "Contact Forms",
      "Local SEO",
      "Tailwind CSS"
    ],
    results: "Delivered a professional website that establishes credibility and trust, helping Tim Smith Construction stand out in the competitive Northern Michigan construction market."
  },
  {
    id: 5,
    title: "Lucky Dog Bar & Grille",
    type: "Restaurant",
    live: "https://www.luckydogbarandgrille.com/",
    launchDate: "2025", 
    description: "Dynamic restaurant website for Beulah's gathering place, featuring craft beer selection, menu showcases, and community engagement.",
    overview: "Lucky Dog Bar & Grille wanted a website that captured their role as Beulah's neighborhood gathering place. Built an engaging platform that showcases their craft beer selection, signature THWINGS™, and strong community connections.",
    features: [
      "Interactive menu display with signature items",
      "Craft beer tap rotation showcase (17 rotating taps)",
      "Customer review integration (4.8 TripAdvisor rating)",
      "Community events and engagement features",
      "Location and hours information",
      "Mobile-friendly for on-the-go customers",
      "Gallery showcasing food and atmosphere"
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Review Integration",
      "Menu Management", 
      "Event Calendar",
      "Tailwind CSS"
    ],
    results: "Created an engaging website that perfectly captures Lucky Dog's community atmosphere and has helped establish them as Beulah's premier dining destination with a 4.8-star rating."
  }
];
