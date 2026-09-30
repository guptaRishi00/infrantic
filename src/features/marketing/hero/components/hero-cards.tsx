"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion wrapper for the hero's notification stack: it springs up into
 * place after the GSAP intro and lifts slightly on hover. Transform/opacity
 * only; the template's `MotionConfig reducedMotion="user"` drops the movement
 * for visitors who ask for less motion. The stack itself (and its CSS row
 * cycle) stays a server component passed in as children.
 */
export function HeroCards({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="pt-6"
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 110,
          damping: 18,
          mass: 0.9,
          delay: 0.75,
        },
      }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
    >
      {children}
    </motion.div>
  );
}
