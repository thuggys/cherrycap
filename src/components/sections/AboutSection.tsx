import React from "react";

function AboutSection() {
  return (
    <section className="px-4 border-x full-line-bottom relative">
      <h2 className="text-3xl font-semibold relative full-line-bottom ">
        About
      </h2>
      <div className="flex flex-col gap-4 py-4 font-mono text-sm ">
        <p className="tracking-wide">
          Hi there! I&apos;m Scott Heney — founder of CherryCapitalWeb, and I create 
          <strong>websites that actually make you money</strong>. Based in Beulah, Michigan, 
          I specialize in building custom sites that turn visitors into paying customers 
          for local businesses who are serious about growing their revenue.
        </p>
        <p className="tracking-wide">
          Here&apos;s what sets my websites apart: <strong>lightning-fast loading speeds</strong> 
          (under 2 seconds), mobile-first design that looks perfect on every device, and 
          conversion-focused layouts scientifically designed to guide visitors toward taking action. 
          I use the same enterprise-level technology that powers <strong>Nike, Spotify, OpenAI, 
          Stripe, Sonos, and Netflix</strong> — Next.js and React.
        </p>
        <p className="tracking-wide">
          Every site I build is completely custom-designed for your business and includes 
          <strong>built-in SEO optimization</strong>, Google Analytics setup, mobile optimization, 
          and conversion-focused design. Each website is strategically crafted to turn visitors 
          into customers and designed to pay for itself through increased business.
        </p>
        <p className="tracking-wide">
          After your site launches, I provide <strong>ongoing maintenance and support</strong> 
          that includes reliable hosting, security updates, performance monitoring, content updates, 
          and technical support. Your website stays fast, secure, and up-to-date while you focus 
          on running your business.
        </p>
        <p className="tracking-wide">
          This isn&apos;t just a website — it&apos;s a complete digital business solution designed 
          to grow your revenue. <strong>Call me at (616) 260-9863</strong> to discuss your specific 
          needs and see examples of websites I&apos;ve built for local businesses. Let&apos;s have 
          a conversation about how the right website can transform your business. <em>Currently accepting new clients.</em>
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
