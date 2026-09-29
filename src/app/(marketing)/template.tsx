"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Page entry animation for every marketing route. A template (unlike the
 * layout) is remounted on each navigation, so every page gets the same subtle
 * fade-and-rise, on first load and on client-side navigation alike. The header
 * and footer live in the layout and stay put.
 *
 * Transform + opacity only, and short. Framer clears the transform to `none`
 * when it settles, so fixed/sticky descendants behave normally afterwards.
 * `reducedMotion="user"` drops the movement (keeps the fade) for visitors who
 * ask for less motion. The <noscript> rule in the root layout shows the page
 * if JavaScript never runs.
 */
export default function MarketingTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-page-enter=""
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
