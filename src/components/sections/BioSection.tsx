import { BriefcaseBusiness, CodeXml, Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function BioSection() {
  const bioData = [
    {
      icon: CodeXml,
      title: "Senior Frontend Developer & Tech Blog Writter",
      type: "text",
    },
    { icon: BriefcaseBusiness, title: "Currently Working as a Freelancer", type: "text" },
    { icon: MapPin, title: "Ramgarh, Jharkhand, India", type: "text" },
    { icon: Phone, title: "+91 76672-82384", type: "link" },
    { icon: Mail, title: "mdtaqui.jhar@gmail.com", type: "link" },
    { icon: Globe, title: "mdtaquiimam.vercel.app", type: "link" },
  ];
  return (
    <section className="relative flex full-line-bottom h-auto border-x p-4 gap-2 flex-col items-center justify-center">
      {bioData.map((item, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-start gap-4 font-mono text-sm "
        >
          <div className="bg-muted shrink-0  text-muted-foreground size-6 flex items-center justify-center rounded-sm ">
            <item.icon className="size-4" />
          </div>{" "}
          {item.type === "link" ? (
            <a
              target="_blank"
              href={
                item.title.includes("vercel.app")
                  ? `https://${item.title}`
                  : item.title.startsWith("+91")
                  ? `tel:${item.title}`
                  : `mailto:${item.title}`
              }
              className="text-balance  hover:underline"
            >
              {item.title}
            </a>
          ) : (
            <span className="text-balance">{item.title}</span>
          )}
        </div>
      ))}
    </section>
  );
}

export default BioSection;
