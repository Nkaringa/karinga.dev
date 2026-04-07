"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useUIStore } from "@/store/useUIStore";
import { usePathname } from "next/navigation";
import { SCROLL_CONFIG } from "@/lib/animations";
import { ScrollTrigger } from "@/lib/gsap/config";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollState = useUIStore((state) => state.setScrollState);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: SCROLL_CONFIG.DURATION,
      easing: SCROLL_CONFIG.EASING,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: SCROLL_CONFIG.WHEEL_MULTIPLIER,
      touchMultiplier: SCROLL_CONFIG.TOUCH_MULTIPLIER,
      infinite: false,
    });

    lenisRef.current = lenis;

    const onScroll = ({ scroll, limit, velocity, direction }: { 
      scroll: number; 
      limit: number; 
      velocity: number; 
      direction: 1 | -1 
    }) => {
      const progress = scroll / limit;
      setScrollState(progress, Math.abs(velocity), direction);
    };

    lenis.on("scroll", onScroll);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [setScrollState]);

  const isChatOpen = useUIStore((state) => state.isChatOpen);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isChatOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isChatOpen]);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
