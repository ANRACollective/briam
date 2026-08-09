"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "accent" | "outline" | "ghost" | "light";

// Trimmed padding one notch site-wide (client: buttons had "mega space")
const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-white hover:bg-accent-600",
  outline:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
  ghost: "text-ink hover:text-accent",
  light: "bg-white text-ink hover:bg-cloud",
};

export function Button({
  children,
  href,
  variant = "accent",
  className,
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const glow = variant === "accent";

  const inner = (
    <>
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px -8px rgba(119,61,189,0.75)",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  const classes = cn("group", base, variants[variant], className);
  const hover = reduce ? undefined : { y: -2 };
  const tap = reduce ? undefined : { y: 0, scale: 0.98 };

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        whileHover={hover}
        whileTap={tap}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      whileHover={hover}
      whileTap={tap}
    >
      {inner}
    </motion.button>
  );
}
