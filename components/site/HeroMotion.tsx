"use client";

import { motion, useReducedMotion } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function HeroMotion({ children, className, delay = 0 }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut", delay: prefersReduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
