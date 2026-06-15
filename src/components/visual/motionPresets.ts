import { useReducedMotion, type Variants } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOut },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.22, ease: easeOut },
  },
};

export function useAnimReduce() {
  return useReducedMotion();
}

export function instantIfReduced(reduce: boolean | null, delay: number) {
  return reduce ? 0 : delay;
}
