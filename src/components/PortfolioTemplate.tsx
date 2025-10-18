"use client";
import React from "react";

interface Entry {
  firstName: string;
  lastName: string;
  profession: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  email: string;
  skills: string;
}

export function PortfolioTemplate({ entry }: { entry: Entry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header/Hero */}
      <section className="px-4 py-16 border-x full-line-bottom relative max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">
          {entry.firstName} {entry.lastName}
        </h1>
        <p className="text-2xl text-slate-400 mb-4">{entry.profession}</p>
        <p className="text-slate-300 max-w-2xl leading-relaxed">{entry.bio || "Building amazing things."}</p>

        <div className="flex gap-4 mt-6">
          {entry.linkedinUrl && (
            <a
              href={entry.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-mono text-sm"
            >
              LinkedIn
            </a>
          )}
          {entry.portfolioUrl && (
            <a
              href={entry.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-mono text-sm"
            >
              Portfolio
            </a>
          )}
          <a
            href={`mailto:${entry.email}`}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-mono text-sm"
          >
            Contact
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="px-4 py-12 border-x full-line-bottom relative max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Skills & Experience</h2>
        <div className="bg-slate-800 p-6 rounded border border-slate-700">
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
            {entry.skills}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 border-x full-line-bottom relative max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 rounded text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3>
          <a
            href={`mailto:${entry.email}`}
            className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded hover:bg-slate-100 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-x text-center text-slate-400 text-sm max-w-4xl mx-auto">
        <p>Portfolio built with CherryCapitalWeb</p>
      </footer>
    </div>
  );
}
