"use client";

import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type Variant = "accent" | "light" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-medium tracking-wide transition-colors duration-300";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-white hover:bg-accent-600",
  light: "bg-white text-ink hover:bg-cloud",
  outline: "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

/**
 * Magnetic CTA — the button (and its label) drift slightly toward the cursor,
 * then spring back on leave. A subtle "premium" cue. Disabled under reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "accent",
  className,
  ariaLabel,
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const glow = variant === "accent" && (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ boxShadow: "0 12px 40px -8px rgba(119,61,189,0.8)" }}
    />
  );
  const label = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  const classes = cn(base, variants[variant], className);
  const style = reduce ? undefined : { x: sx, y: sy };
  const whileTap = reduce ? undefined : { scale: 0.96 };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        whileTap={whileTap}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {glow}
        {label}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      style={style}
      whileTap={whileTap}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {glow}
      {label}
    </motion.button>
  );
}
