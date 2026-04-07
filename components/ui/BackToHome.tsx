"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const BackToHome = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex justify-start mt-8 pb-12">
        <Link href="/" className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-all bg-[var(--color-surface)]/10 backdrop-blur-sm">
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: prefersReducedMotion ? 0 : Infinity, 
              ease: "easeInOut" 
            }}
          >
            <svg
              className="w-4 h-4 text-[var(--color-accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </motion.div>
          <span className="text-sm font-medium tracking-tight text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};
