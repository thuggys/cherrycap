import React from "react";
import LinkedinLogo from "../../../public/linkedinLogo.webp";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

function SocialLinks() {
  const socialLinks = [
    {
      name: "LinkedIn",
      username: "@scott-heney", // TODO: Update with actual LinkedIn
      src: LinkedinLogo.src,
      alt: "LinkedIn",
      href: "https://www.linkedin.com/in/scott-heney/", // TODO: Update with actual LinkedIn
    },
  ];

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-edge"></div>
        <div className="border-l border-edge"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-x">
        {socialLinks.map((link, index) => (
          <a
            href={link.href}
            target="_blank"
            className={cn(
              "flex p-4 group/link items-center gap-4 justify-start relative select-none transition-colors",
              index % 2 === 0 ? "full-line-top full-line-bottom" : "",
              index === (socialLinks.length - 1) && "border-b md:border-b-0"
            )}
            key={index}
          >
            <div className="relative size-12 shrink-0">
              <img
                src={link.src}
                alt={link.alt}
                className="rounded-xl"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start grow justify-between">
              <h3 className="font-medium group-hover/link:underline underline-offset-4">
                {link.name}
              </h3>
              <span className="text-muted-foreground text-sm">
                {link.username}
              </span>
            </div>
            <div className="relative flex items-center justify-center shrink-0">
              <ExternalLink className="size-5 text-muted-foreground group-hover/link:text-primary" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SocialLinks;
