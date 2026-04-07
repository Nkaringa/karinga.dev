"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.25,
  duration = 0.5,
  ...props
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration, delay, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};
