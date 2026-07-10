"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const STATS = [
  { value: "4", label: "Primary Markets" },
  { value: "2", label: "Solution Streams" },
  { value: "1", label: "Regional Exclusive" },
];

// Each figure fades + rises within its own slice of the section scroll pass,
// so 4 → 2 → 1 reveal one after another while the sculpture keeps twirling.
function StatFigure({
  s,
  range,
  progress,
  reduce,
}: {
  s: (typeof STATS)[number];
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [26, 0]);
  return (
    <motion.div
      style={reduce ? undefined : { opacity, y }}
      className="border-l-2 border-line pl-4 sm:pl-5"
    >
      <span className="font-display block text-[clamp(3.6rem,7vw,6.5rem)] leading-none text-accent">
        {s.value}
      </span>
      <span className="font-display mt-3 block text-sm uppercase leading-none tracking-[-0.01em] text-ink sm:text-base">
        {s.label}
      </span>
    </motion.div>
  );
}

export function Stats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Section-pass progress drives the sculpture's twirl + the staged number reveals.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Twirl: rotate + gentle scale, smoothed with a spring so it feels organic.
  const rotateRaw = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1.16]);
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 20, mass: 0.6 });
  const scale = useSpring(scaleRaw, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <section ref={ref} id="stats" className="relative overflow-hidden bg-cloud">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[6%] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[170px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 py-20 md:py-24 lg:min-h-screen lg:grid-cols-2 lg:gap-4 lg:py-0">
          {/* Left — heading, subtext, staged figures */}
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

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              <StatFigure s={STATS[0]} range={[0.24, 0.4]} progress={scrollYProgress} reduce={!!reduce} />
              <StatFigure s={STATS[1]} range={[0.36, 0.52]} progress={scrollYProgress} reduce={!!reduce} />
              <StatFigure s={STATS[2]} range={[0.48, 0.64]} progress={scrollYProgress} reduce={!!reduce} />
            </div>
          </motion.div>

          {/* Right — real BRIAM sculpture render, bigger, bleeding right, twirling on scroll.
              Source render is light-on-black; invert + multiply lands it cleanly on the
              cloud background as a charcoal sculpture. */}
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
