"use client";

import React from "react";
import { About as AboutSection } from "@/components/sections/About";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { BackToHome } from "@/components/ui/BackToHome";

const PHILOSOPHY = [
  {
    title: "Design-First, Code-Second",
    description: "Visual and UX decisions are made before a single line is written. No component ships without a clear design intent. Aesthetic consistency is non-negotiable — every pixel is deliberate.",
  },
  {
    title: "Motion as Communication",
    description: "Animation is not decoration — it communicates state, hierarchy, and intention. GSAP handles timeline choreography while Framer Motion manages transitions. Every motion has a reason.",
  },
  {
    title: "Performance as a Feature",
    description: "Targeting Lighthouse scores ≥ 95. Three.js scenes are lazy-loaded, code is split at the component level, and assets are optimized for zero layout shift and high responsiveness.",
  },
];

const PhilosophyCard = ({ title, description, index }: { title: string; description: string; index: number }) => (
  <Reveal delay={0.1 * index}>
    <div className="p-8 bg-[var(--color-surface)]/60 backdrop-blur-md border border-[var(--color-border)]/60 rounded-3xl space-y-4 hover:bg-[var(--color-surface)]/30 transition-colors h-full">
      <h3 className="text-xl font-bold text-[var(--color-text)] tracking-tight">
        {title}
      </h3>
      <p className="text-[var(--color-text)]/80 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  </Reveal>
);

const PhilosophySection = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 border-t border-[var(--color-border)]">
    <div className="space-y-16">
      <div className="space-y-4 text-center">
        <Reveal>
          <Tag variant="accent">Core Values</Tag>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text)]">
            The Philosophy.
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        {PHILOSOPHY.map((item, index) => (
          <PhilosophyCard key={item.title} {...item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 w-full text-center space-y-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs tracking-display uppercase mb-4 px-3 py-1 border border-[var(--color-accent)]/20 rounded-full bg-[var(--color-accent)]/5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-status-available)] motion-safe:animate-pulse" />
            Available for Opportunities
          </span>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-[var(--color-text)]">
              The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]">
                Architect.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text)]/80 font-medium leading-relaxed">
              Bridging high-level engineering and cinematic motion to build 
              interfaces that live, breathe, and respond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main About Section (Reused) */}
      <AboutSection />

      {/* Philosophy Block */}
      <PhilosophySection />

      {/* Resume CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center border-t border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto space-y-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]">
              Curious about the technical journey?
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-[var(--color-text)]/80 text-lg">
              A detailed record of my professional experience and core 
              competencies is available for deep review.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Button variant="primary" size="lg" className="rounded-full px-12" asChild>
              <a href="/resume/Nageshkaringa.pdf" download>
                Download Resume
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <BackToHome />
    </div>
  );
}
