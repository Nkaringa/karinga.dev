"use client";

import React, { useEffect, useRef } from "react";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { gsap } from "@/lib/gsap/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js 15", "TypeScript", "Tailwind v4", "Radix UI", "Zustand"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "PostgreSQL", "Prisma ORM", "Redis", "Supabase", "REST API"],
  },
  {
    category: "AI & Automation",
    items: ["MCP", "LLM Integration", "AI Orchestration", "Prompt Engineering"],
  },
  {
    category: "DevOps & Testing",
    items: ["Docker", "CI/CD", "Vercel", "Jest", "Playwright", "Git"],
  },
];

const EXPERIENCE = [
  {
    date: "2026 — Present",
    role: "AI Systems Architect",
    company: "Self-Directed",
    description:
      "Architecting multi-agent development pipelines using MCP, building full-stack platforms with real-time AI integration, and engineering high-performance web applications.",
  },
  {
    date: "Jan 2024 — Dec 2025",
    role: "M.Sc. Computer Science",
    company: "University of North Texas",
    description:
      "Graduate studies in AI, Data Mining, Software Engineering, and Advanced Data Analytics. Graduated December 2025.",
  },
  {
    date: "Jun 2023 — Dec 2023",
    role: "Frontend Developer",
    company: "WIS Spaces",
    description:
      "Re-engineered flagship landing page with React.js and SSR, driving a 30% lift in customer acquisition and 25% boost in site-wide conversion. Optimized Core Web Vitals and maintained 95% unit test coverage.",
  },
];

// Animation timing constants
const ANIMATION_TIMING = {
  STAGGER_DELAY: 0.05,
  SKILLS_DURATION: 0.6,
  TIMELINE_DURATION: 1,
  BIO_DELAYS: {
    HEADING: 0,
    PARAGRAPH_1: 0.2,
    PARAGRAPH_2: 0.3,
  },
};

export const About = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) {
      // Skills Stagger Reveal
      if (skillsRef.current) {
        const tags = skillsRef.current.querySelectorAll(".skill-tag");
        gsap.from(tags, {
          opacity: 0,
          y: 20,
          duration: ANIMATION_TIMING.SKILLS_DURATION,
          stagger: ANIMATION_TIMING.STAGGER_DELAY,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Timeline Entrance
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        items.forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          });
        });
      }
    }
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      aria-label="About"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        {/* Left Column: Bio & Skills */}
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text)]">
                Nagesh Goud Karinga <br />
                <span className="text-[var(--color-text)]/70">Systems. Interfaces. Intelligence.</span>
              </h2>
            </Reveal>

            <div className="space-y-4 text-lg text-[var(--color-text)]/80 leading-relaxed max-w-2xl">
              <Reveal delay={ANIMATION_TIMING.BIO_DELAYS.PARAGRAPH_1}>
                <p>
                  Full-Stack Engineer and AI Systems Architect.
                  I build at the intersection of performance engineering and creative technology,
                  with a Master&apos;s in Computer Science from the University of North Texas.
                </p>
              </Reveal>
              <Reveal delay={ANIMATION_TIMING.BIO_DELAYS.PARAGRAPH_2}>
                <p>
                  I build systems that scale and tools that last. My approach is defined by three non-negotiables: extreme performance, structural simplicity, and production-readiness from the first commit.  I build with the conviction that if a system can&apos;t hold up under production stress, it isn&apos;t finished.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="space-y-8" ref={skillsRef}>
            <Reveal>
              <h3 className="text-xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] font-mono">
                Technical Arsenal
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {SKILLS.map((group) => (
                <div key={group.category} className="space-y-4 p-6 bg-[var(--color-surface)]/60 backdrop-blur-md border border-[var(--color-border)]/60 rounded-2xl">
                  <h4 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Tag key={skill} variant="default" className="skill-tag">
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-5">
          <div className="space-y-8 p-6 md:p-8 bg-[var(--color-surface)]/50 backdrop-blur-md border border-[var(--color-border)]/50 rounded-2xl h-full">
            <Reveal>
              <h3 className="text-xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] font-mono">
                Professional Journey
              </h3>
            </Reveal>

            <ol ref={timelineRef} className="relative space-y-12 border-l border-[var(--color-border)] ml-4 py-4">
              {EXPERIENCE.map((item, index) => (
                <li key={index} className="timeline-item pl-8 relative">
                  {/* Timeline Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-[var(--color-accent)] rounded-full border-2 border-[var(--color-bg)]"
                  />

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[var(--color-accent)]">
                      {item.date}
                    </span>
                    <h4 className="text-xl font-bold text-[var(--color-text)]">
                      {item.role}
                    </h4>
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      {item.company}
                    </p>
                    <p className="text-sm text-[var(--color-text)] leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
