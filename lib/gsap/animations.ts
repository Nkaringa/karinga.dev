import { gsap } from "./config";

export const revealOnScroll = (
  element: string | HTMLElement,
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
  } = {}
) => {
  const {
    y = 30,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = "power3.out",
    trigger = element,
    start = "top 85%",
    end = "bottom 20%",
    scrub = false,
    markers = false,
    toggleActions = "play none none none",
  } = options;

  return gsap.from(element, {
    y,
    x,
    opacity,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      markers,
      toggleActions,
    },
  });
};

/**
 * Reusable parallax effect for GSAP
 */
export const createParallax = (
  element: string | HTMLElement,
  options: {
    y?: number | string;
    x?: number | string;
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    y = -100,
    x = 0,
    trigger = element,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  return gsap.to(element, {
    y,
    x,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });
};
