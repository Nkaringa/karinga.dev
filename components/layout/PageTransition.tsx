"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TRANSITION_CONFIG } from "@/lib/animations";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : TRANSITION_CONFIG.INITIAL_Y }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : TRANSITION_CONFIG.EXIT_Y }}
        transition={{
          duration: TRANSITION_CONFIG.DURATION,
          ease: TRANSITION_CONFIG.EASE,
        }}
        className="w-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
