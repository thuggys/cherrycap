"use client";
import React from "react";
import { useTheme } from "next-themes";
import { RaffleForm } from "@/components/RaffleForm";
import { ShineBorder } from "@/components/ui/shine-border";
import { Highlighter } from "@/components/ui/highlighter";

export function RaffleSection() {
  const theme = useTheme();
  const highlightColor = theme.resolvedTheme === "dark" ? "#fe8019" : "#d65d0e";

  return (
    <section className="px-4 border-x full-line-bottom relative">
      <div className="pl-4 py-8 relative full-line-bottom">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Win a Free{" "}
          <Highlighter 
            action="highlight" 
            color={highlightColor}
            strokeWidth={2}
            animationDuration={800}
            isView={true}
          >
            Portfolio Website
          </Highlighter>
        </h2>
      </div>
      <div className="p-4">
        <div className="max-w-2xl mx-auto relative rounded p-6 overflow-hidden bg-background">
          <ShineBorder
            borderWidth={2}
            duration={14}
            shineColor={["#b8860b", "#d65d0e", "#b8860b"]}
          />
          <div className="mb-8">
            <p className="text-sm font-mono text-muted-foreground mb-6">
              Are you a local professional looking to stand out? Enter for a chance to win a complete, 
              custom portfolio website built by CherryCapitalWeb—absolutely free. Perfect for job seekers, 
              freelancers, and anyone ready to level up their online presence.
            </p>
            <p className="text-sm font-mono text-primary font-bold mb-6">
              🎯 1 Winner will be selected! Applications accepted until October 31st.
            </p>

            <div className="bg-card p-6 rounded border border-border mb-6">
              <h3 className="font-bold mb-3 text-sm text-foreground">What You Win:</h3>
              <ul className="text-sm space-y-2 font-mono text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Custom-built portfolio website showcasing your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Professional design optimized for job applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Mobile-responsive and lightning-fast performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>SEO optimization to help you rank in searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>3 months of free hosting and support</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Priority technical support during those 3 months</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded border border-primary/30 mb-6">
              <h3 className="font-bold mb-2 text-sm text-primary">How It Works:</h3>
              <p className="text-sm text-muted-foreground font-mono">
                Fill out the form below with your info and tell us about your skills. We&apos;ll randomly select 
                a winner. The selected winner will work with us to create a portfolio that makes hiring 
                managers say &quot;yes&quot; before they even meet you.
              </p>
            </div>
          </div>

          <RaffleForm />
        </div>
      </div>
    </section>
  );
}
