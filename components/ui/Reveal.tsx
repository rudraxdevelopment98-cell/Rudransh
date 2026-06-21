"use client";

import { motion } from "framer-motion";
import { fadeRise, staggerContainer, inViewOnce } from "@/lib/motion";

/** Scroll-reveal wrapper: fade + 24px rise, fires once on view. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeRise}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children, each using the RevealItem variant. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeRise}>
      {children}
    </motion.div>
  );
}
