/**
 * Shared animation and scroll configuration constants.
 */

export const SCROLL_CONFIG = {
  DURATION: 1.2,
  EASING: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  WHEEL_MULTIPLIER: 1,
  TOUCH_MULTIPLIER: 2,
} as const;

export const TRANSITION_CONFIG = {
  DURATION: 0.4,
  EASE: [0.22, 1, 0.36, 1], // Custom ease-out-expo-like
  INITIAL_Y: 20,
  EXIT_Y: -20,
} as const;
