import React from "react";

function AboutSection() {
  return (
    <section className="px-4 border-x full-line-bottom relative">
      <h2 className="text-3xl font-semibold relative full-line-bottom ">
        About
      </h2>
      <div className="flex flex-col gap-4 py-4 font-mono text-sm ">
        <p className="tracking-wide">
          Hi there! I&apos;m Scott Heney — founder of CherryCapitalWeb and a full stack developer 
          cooking up modern web solutions in Beulah, Michigan. I love building innovative websites 
          and helping local businesses level up their digital presence.
        </p>
        <p className="tracking-wide">
          I specialize in creating fast, responsive, and professional websites using cutting-edge 
          technologies like Next.js, React, TypeScript, and Node.js. While most of my competition 
          relies on WordPress, I build custom solutions from scratch using modern web frameworks 
          that deliver superior performance and user experience.
        </p>
        <p className="tracking-wide">
          Having built several websites in the area, I&apos;ve seen firsthand how powerful modern 
          web development can be compared to traditional WordPress approaches. I&apos;m passionate 
          about learning new technologies and always pushing the boundaries of what&apos;s possible 
          on the web.
        </p>
        <p className="tracking-wide">
          When I&apos;m not coding, I&apos;m exploring the latest web development trends, 
          contributing to open source projects, and finding new ways to help businesses 
          stand out in an increasingly digital world.
        </p>
        <p className="tracking-wide">
          Ready to build something amazing? Let&apos;s work together to create a website 
          that actually converts and performs!
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
