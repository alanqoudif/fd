import { useReducedMotion, type Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.4, delayChildren: 0.15 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

export function useAnimReduce() {
  return useReducedMotion();
}

export function instantIfReduced(reduce: boolean | null, delay: number) {
  return reduce ? 0 : delay;
}
