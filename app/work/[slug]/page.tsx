"use client";

import React, { use } from "react";
import { getProjectById, WORK_ANIMATION } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Project Header */}
        <div className="lg:col-span-8 space-y-8">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} variant="accent">
                  {tag}
                </Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-text)] leading-[0.9]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 2}>
            <p className="text-xl md:text-2xl text-[var(--color-text)]/80 leading-relaxed font-medium">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* Project Meta */}
        <div className="lg:col-span-4 space-y-12">
          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 3}>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-[var(--color-border)]">
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2">Year</span>
                <span className="text-lg font-medium">{project.year}</span>
              </div>
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2">Role</span>
                <span className="text-lg font-medium">{project.role}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2">Client</span>
                <span className="text-lg font-medium">{project.client}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 4}>
            <div className="flex flex-col gap-4">
              {project.links?.live && (
                <Button variant="primary" size="lg" className="w-full rounded-full" asChild>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Visit Live Site
                  </a>
                </Button>
              )}
              {project.links?.github && (
                <Button variant="secondary" size="lg" className="w-full rounded-full" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    View Source
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-8 space-y-12 mt-12">
          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 5}>
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-6 underline decoration-[var(--color-accent)] decoration-2 underline-offset-8">
                The Objective
              </h2>
              <p className="text-[var(--color-text)]/80 text-lg leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          </Reveal>

          {/* Media Section */}
          <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 6} width="100%">
            <div className="aspect-video w-full bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden group">
              {project.image ? (
                <Image 
                  src={project.image} 
                  alt={`${project.title} screenshot`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent" />
                  <p className="text-[var(--color-text-muted)] font-mono text-sm uppercase tracking-widest">
                    Media Artifact Placeholder
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Back Link */}
      <Reveal delay={WORK_ANIMATION.DETAIL_DELAY_INCREMENT * 7} className="mt-24 pt-12 border-t border-[var(--color-border)]">
        <Link 
          href="/work" 
          aria-label="Back to all projects"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md"
        >
          <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to all Work
        </Link>
      </Reveal>
    </article>
  );
}
