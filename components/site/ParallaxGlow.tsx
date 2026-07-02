"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function ParallaxGlow() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -50]);

  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y }}>
      <div
        className="absolute -top-32 left-1/2 h-[420px] w-[760px] max-w-full -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-16 left-[12%] h-[260px] w-[400px] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-2) 12%, transparent) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
