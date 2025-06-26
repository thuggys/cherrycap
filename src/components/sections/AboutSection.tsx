import React from "react";

function AboutSection() {
  return (
    <section className="px-4 border-x full-line-bottom relative">
      <h2 className="text-3xl font-semibold relative full-line-bottom ">
        About
      </h2>
      <div className="flex flex-col gap-4 py-4 font-mono text-sm ">
        <p className="tracking-wide">
          Hi there! I&apos;m Md Taqui Imam — a full stack web developer from Ramgarh
          Cantt, Jharkhand, India. I love building stuffs and sharing cool
          projects in the open-source community.
        </p>
        <p className="tracking-wide">
          I&apos;m good at making neat and mobile-friendly websites using JavaScript,
          TypeScript, React, Next.js, and Node.js. I also know HTML5, CSS3, and
          tools like Tailwind CSS, Shadcn Ui, and Material UI to make clean and
          nice-looking designs.
        </p>
        <p className="tracking-wide">
          Right now, I&apos;m doing my Bachelor&apos;s in Computer Applications from
          Doranda College, Ranchi University. I&apos;m learning lots of coding stuff
          and also making real projects to improve my skills.
        </p>
        <p className="tracking-wide">
          Besides coding, I enjoy writing tech blogs, watching anime, and
          playing games. I like learning new things and always try to turn ideas
          into real web apps.
        </p>
        <p className="tracking-wide">
          Let&apos;s connect and build something awesome!
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
