import type { Variants, Transition } from "framer-motion";

export const easeOutExpo: Transition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

export const easeSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...easeOutExpo, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOutExpo },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOutExpo,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const floatY: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.75, 0.4],
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};
