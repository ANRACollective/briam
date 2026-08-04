"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

/**
 * Stats — data-driven per boss feedback:
 * - metrics are a plain array: add/remove entries freely (comment #11)
 * - the grid adapts to any count, odd or even, above 4 (comment #12)
 * - `highlight: true` on an entry renders it big with the rest smaller
 *   (the "1 bigger, 3 smaller" variation)
 * - numeric values count up once on scroll-into-view (sticky note)
 */

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  highlight?: boolean;
};

const STATS: Stat[] = [
  { value: 1000, suffix: "+", label: "Projects Delivered", highlight: true },
  { value: 20, suffix: "+", label: "Markets Served" },
  { value: 2, label: "Solution Streams" },
  { value: 1, label: "Regional Exclusive" },
];

function StatFigure({ s, i, big }: { s: Stat; i: number; big?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 border-line pl-4 sm:pl-5"
    >
      <AnimatedCounter
        value={s.value}
        suffix={s.suffix}
        duration={big ? 2.2 : 1.6}
        className={cn(
          "font-display block leading-none text-accent",
          big
            ? "text-[clamp(4.5rem,9vw,8rem)]"
            : "text-[clamp(3rem,5.5vw,5rem)]",
        )}
      />
      <span
        className={cn(
          "font-display mt-3 block uppercase leading-none tracking-[-0.01em] text-ink",
          big ? "text-base sm:text-lg" : "text-sm sm:text-base",
        )}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

export function Stats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Section-pass progress drives the sculpture twirl (scroll-tied parallax —
  // driven by the user, not looping on its own).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateRaw = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1.16]);
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 20, mass: 0.6 });
  const scale = useSpring(scaleRaw, { stiffness: 60, damping: 20, mass: 0.6 });

  const highlighted = STATS.find((s) => s.highlight);
  const rest = STATS.filter((s) => s !== highlighted);

  return (
    <section ref={ref} id="stats" className="relative overflow-hidden bg-cloud">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[6%] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[170px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 py-20 md:py-24 lg:min-h-screen lg:grid-cols-2 lg:gap-4 lg:py-0">
          {/* Left — heading, subtext, figures */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-xl"
          >
            <Eyebrow className="mb-5">By the numbers</Eyebrow>
            <h2 className="type-h2 text-ink">
              Engineering capability, delivered across Southeast Asia
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              BRIAM Asia operates from Singapore with manufacturing and project
              delivery reach across the region.
            </p>

            {highlighted ? (
              <div className="mt-12 flex max-w-xl flex-col gap-8">
                <StatFigure s={highlighted} i={0} big />
                <div
                  className="grid gap-6"
                  style={{ gridTemplateColumns: `repeat(${Math.min(rest.length, 3)}, minmax(0, 1fr))` }}
                >
                  {rest.map((s, i) => (
                    <StatFigure key={s.label} s={s} i={i + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="mt-12 grid max-w-xl gap-6"
                style={{ gridTemplateColumns: `repeat(${Math.min(STATS.length, 3)}, minmax(0, 1fr))` }}
              >
                {STATS.map((s, i) => (
                  <StatFigure key={s.label} s={s} i={i} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — BRIAM sculpture render, twirling on scroll. */}
          <div className="relative h-[62vh] min-h-[480px] lg:h-[94vh]">
            <motion.div
              className="absolute inset-y-0 left-[-14%] right-[-22%]"
              style={reduce ? undefined : { rotate, scale }}
            >
              <Image
                src="/images/sculpture.png"
                alt="BRIAM Asia structural steel silo assembly"
                fill
                sizes="60vw"
                priority
                className="object-contain opacity-90 [filter:invert(1)] mix-blend-multiply"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
