"use client";

import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { ReactNode } from "react";

// Radial glow that tracks the pointer position
function usePointerGlow(mx: MotionValue<number>, my: MotionValue<number>) {
  return useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x}% ${y}%, rgba(119,61,189,0.14), transparent 65%)`,
  );
}

/**
 * Card that lifts and reveals a soft purple glow that follows the cursor.
 * Purely decorative — pointer glow is disabled under reduced-motion.
 */
export function GlowCard({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = usePointerGlow(mx, my);
  const MotionTag = motion[as];

  return (
    <MotionTag
      onMouseMove={
        reduce
          ? undefined
          : (e: React.MouseEvent<HTMLElement>) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(((e.clientX - r.left) / r.width) * 100);
              my.set(((e.clientY - r.top) / r.height) * 100);
            }
      }
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line/70 bg-white transition-colors duration-300 hover:border-accent/50",
        className,
      )}
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      <span className="relative z-10 block h-full">{children}</span>
    </MotionTag>
  );
}
