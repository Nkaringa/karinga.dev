"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/Nkaringa", label: "Follow me on GitHub" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nageshkaringa/", label: "Connect with me on LinkedIn" },
];

const CONTACT_ANIMATION = {
  LABEL_DELAY: 0.1,
  HEADLINE_DELAY: 0.2,
  SUBTEXT_DELAY: 0.3,
  EMAIL_DELAY: 0.4,
  SOCIAL_START_DELAY: 0.5,
  SOCIAL_STAGGER: 0.1,
  STATUS_DELAY: 0.8,
};

export const Contact = () => {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="flex flex-col items-center text-center space-y-12">
        {/* Section Label */}
        <Reveal delay={CONTACT_ANIMATION.LABEL_DELAY}>
          <Tag variant="accent">The Digital Handshake</Tag>
        </Reveal>

        {/* Headline */}
        <div className="space-y-6 max-w-4xl">
          <Reveal delay={CONTACT_ANIMATION.HEADLINE_DELAY}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-[var(--color-text)]">
              Let&apos;s Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]">
                Something Real.
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={CONTACT_ANIMATION.SUBTEXT_DELAY}>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
              Currently open for revolutionary collaborations, architectural inquiries, or deep dives into the future of creative technology.
            </p>
          </Reveal>
        </div>

        {/* Primary Contact Action */}
        <Reveal delay={CONTACT_ANIMATION.EMAIL_DELAY}>
          <div className="group relative">
            <a
              href="mailto:nageshkaringa@gmail.com"
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg px-4 py-2"
            >
              nageshkaringa@gmail.com
            </a>
            {/* Animated Underline */}
            <div 
              aria-hidden="true"
              className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[var(--ease-out-expo)]" 
            />
          </div>
        </Reveal>

        {/* Social Grid */}
        <div className="flex flex-wrap justify-center gap-4 pt-12">
          {SOCIAL_LINKS.map((link, index) => (
            <Reveal key={link.name} delay={CONTACT_ANIMATION.SOCIAL_START_DELAY + index * CONTACT_ANIMATION.SOCIAL_STAGGER}>
              <Button
                variant="ghost"
                size="lg"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] px-8"
                asChild
              >
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.name}
                </a>
              </Button>
            </Reveal>
          ))}
        </div>

        {/* Availability Status */}
        <Reveal delay={CONTACT_ANIMATION.STATUS_DELAY}>
          <div className="flex items-center gap-3 pt-12">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-status-available-glow)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-status-available)]"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Status: Available for Opportunities
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
