"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { createParallax } from "@/lib/gsap/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUIStore } from "@/store/useUIStore";

// Placeholder for Scene component
const ScenePlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)]/20 animate-pulse rounded-2xl border border-[var(--color-border)]">
    <p className="text-[var(--color-text-muted)] text-sm font-mono">
      Initializing 3D Core...
    </p>
  </div>
);

// Stub Scene component
const Scene = () => <div className="w-full h-full" />;

export const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const setChatOpen = useUIStore((state) => state.setChatOpen);

  useEffect(() => {
    // Parallax Effect for Headline
    if (!prefersReducedMotion && headlineRef.current && containerRef.current) {
      const animation = createParallax(headlineRef.current, {
        trigger: containerRef.current,
        y: "20%",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      });

      return () => {
        if (animation.scrollTrigger) animation.scrollTrigger.kill();
        animation.kill();
      };
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-12 overflow-hidden"
    >
      {/* Background/Canvas Slot */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-50">
        <Suspense fallback={<ScenePlaceholder />}>
          <Scene />
        </Suspense>
      </div>

      <div className="max-w-5xl w-full text-center space-y-8 z-10">
        <Reveal delay={0.2}>
          <span className="inline-block text-[var(--color-accent)] font-mono text-xs tracking-display uppercase mb-4 px-3 py-1 border border-[var(--color-accent)]/20 rounded-full bg-[var(--color-accent)]/5">
            Karinga.dev v1.0
          </span>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.4}>
            <h1
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-[var(--color-text)]"
            >
              Systems That Think. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]">
                Interfaces That Move.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text)]/80 font-medium leading-relaxed">
              Full-Stack Engineer & AI Systems Architect — building products that move, think, and scale.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" className="rounded-full w-full sm:w-auto" asChild>
              <Link href="/work">
                View Work
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="rounded-full w-full sm:w-auto"
              onClick={() => setChatOpen(true)}
            >
              Meet the Architect
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <Reveal delay={1.2} className="absolute bottom-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[var(--color-text-muted)] text-2xs uppercase tracking-widest font-mono">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
