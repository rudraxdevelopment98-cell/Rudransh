import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language from designSystem.motion.defaults.
 * Quiet only — no bounce, no spring overshoot, no spinning.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.6;

export const baseTransition: Transition = {
  duration: DURATION,
  ease: EASE,
};

/** Fade + 24px rise, triggered once on view. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Staggered container for revealing children in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Soft cross-fade page transition. */
export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

/** Standard scroll-reveal viewport config — fires once. */
export const inViewOnce = { once: true, margin: "-80px" } as const;
