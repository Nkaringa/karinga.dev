"use client";

import React from "react";
import { ProjectCard } from "@/components/sections/Work";
import { PROJECTS, WORK_ANIMATION } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { BackToHome } from "@/components/ui/BackToHome";

export default function WorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="flex flex-col space-y-4 mb-16 md:mb-24">
        <Reveal>
          <Tag variant="accent">Case Studies</Tag>
        </Reveal>
        <Reveal delay={WORK_ANIMATION.INITIAL_DELAY}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-text)]">
            Selected <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]">
              Digital Artifacts.
            </span>
          </h1>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            delay={WORK_ANIMATION.STAGGER_INDEX * (index + 1)}
          />
        ))}
      </div>

      <BackToHome />
    </div>
  );
}
