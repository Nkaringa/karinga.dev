"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, WORK_ANIMATION } from "@/lib/projects";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  delay?: number;
}

const ProjectCard = ({
  id,
  title,
  description,
  tags,
  delay = 0,
}: ProjectCardProps) => (
  <Reveal delay={delay} width="100%">
    <div className="group relative flex flex-col h-full bg-[var(--color-surface)]/60 backdrop-blur-md border border-[var(--color-border)]/60 rounded-2xl p-6 md:p-8 hover:border-[var(--color-accent)]/30 transition-all overflow-hidden">
      {/* Visual Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[var(--color-accent)]/10 transition-colors"
      />

      <div className="flex flex-col h-full relative z-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Tag key={tag} variant="default">
              {tag}
            </Tag>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3">
          {title}
        </h3>

        <p className="text-[var(--color-text)]/80 text-sm md:text-base leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <Link
            href={`/work/${id}`}
            aria-label={`View case study for ${title}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md py-1"
          >
            View Case Study
            <svg
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </Reveal>
);

export const Work = () => {
  return (
    <section
      id="work"
      aria-label="Work"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="flex flex-col space-y-4 mb-16 md:mb-24">
        <Reveal>
          <Tag variant="accent">Featured Case Studies</Tag>
        </Reveal>
        <Reveal delay={WORK_ANIMATION.INITIAL_DELAY}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[var(--color-text)]">
            A Journey Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]">
              Digital Artifacts.
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            delay={WORK_ANIMATION.STAGGER_HOME * (index + 1)}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
export { ProjectCard };
