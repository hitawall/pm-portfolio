"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.35 }: Props) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.1 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [prefersReduced, strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
