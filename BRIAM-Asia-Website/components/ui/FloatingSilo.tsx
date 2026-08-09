"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * A crafted vector "square silo" (BRIAM's actual product) rendered as an
 * isometric metallic block. Gently floats and parallaxes on scroll.
 * Pure SVG — crisp at any size, tiny, and fully controllable.
 */
export function FloatingSilo({
  className,
  parallax = true,
  floatDelay = 0,
}: {
  className?: string;
  parallax?: boolean;
  floatDelay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none select-none", className)}
      style={reduce || !parallax ? undefined : { y }}
      aria-hidden
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        style={{ transformPerspective: 1000 }}
      >
        <motion.div
          animate={reduce ? undefined : { rotateY: [-24, 24, -24] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        >
        <svg viewBox="0 0 420 420" className="h-full w-full drop-shadow-[0_40px_60px_rgba(33,46,54,0.28)]">
          <defs>
            <linearGradient id="siloTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#dfe3e7" />
            </linearGradient>
            <linearGradient id="siloLeft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eef1f3" />
              <stop offset="1" stopColor="#c3c9cf" />
            </linearGradient>
            <linearGradient id="siloRight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d6dbe0" />
              <stop offset="1" stopColor="#a7aeb5" />
            </linearGradient>
            <linearGradient id="siloSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* top face */}
          <path d="M210 60 L360 140 L210 220 L60 140 Z" fill="url(#siloTop)" stroke="#b7bdc4" strokeWidth="1.5" />
          {/* left face */}
          <path d="M60 140 L210 220 L210 372 L60 292 Z" fill="url(#siloLeft)" stroke="#aab0b7" strokeWidth="1.5" />
          {/* right face */}
          <path d="M360 140 L210 220 L210 372 L360 292 Z" fill="url(#siloRight)" stroke="#9aa1a8" strokeWidth="1.5" />

          {/* left panel seams */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <path
              key={`l${i}`}
              d={`M${60 + (210 - 60) * t} ${140 + (220 - 140) * t} L${60 + (210 - 60) * t} ${292 + (372 - 292) * t}`}
              stroke="#b3b9c0"
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
          {/* right panel seams */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <path
              key={`r${i}`}
              d={`M${360 - (360 - 210) * t} ${140 + (220 - 140) * t} L${360 - (360 - 210) * t} ${292 + (372 - 292) * t}`}
              stroke="#8f969d"
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
          {/* horizontal band */}
          <path d="M60 216 L210 296 L360 216" fill="none" stroke="#9aa1a8" strokeWidth="1" opacity="0.6" />

          {/* moving sheen on the top face */}
          <motion.path
            d="M210 60 L360 140 L210 220 L60 140 Z"
            fill="url(#siloSheen)"
            initial={{ opacity: 0.0 }}
            animate={reduce ? undefined : { opacity: [0.0, 0.35, 0.0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay + 1 }}
          />

          {/* accent rim light */}
          <path d="M210 60 L360 140" stroke="#a679e0" strokeWidth="2" opacity="0.5" />
        </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
