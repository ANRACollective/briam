"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";

// WebGL canvas — client-only.
const Silo3D = dynamic(() => import("@/components/ui/Silo3D"), { ssr: false });

const STATS = [
  { value: "4", label: "Primary Markets" },
  { value: "2", label: "Solution Streams" },
  { value: "1", label: "Regional Exclusive" },
];

function LeftContent({
  figuresStyle,
}: {
  figuresStyle?: { opacity: MotionValue<number>; y: MotionValue<number> };
}) {
  return (
    <div className="max-w-xl">
      <Eyebrow className="mb-5">By the numbers</Eyebrow>
      <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] uppercase leading-[0.85] tracking-[-0.02em] text-ink">
        Engineering capability, delivered across Southeast Asia
      </h2>
      <p className="mt-6 max-w-md text-lg text-ink/70">
        BRIAM Asia operates from Singapore with manufacturing and project
        delivery reach across the region.
      </p>

      <motion.div style={figuresStyle} className="mt-12 grid max-w-lg grid-cols-3 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-line pl-4 sm:pl-5">
            <span className="font-display block text-[clamp(3rem,6vw,5rem)] leading-none text-accent">
              {s.value}
            </span>
            <span className="font-display mt-3 block text-base uppercase leading-none tracking-[-0.01em] text-ink">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Stats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const figOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const figY = useTransform(scrollYProgress, [0.55, 0.72], [24, 0]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ---------- Reduced-motion: static composition ----------
  if (reduce) {
    return (
      <section id="stats" className="relative overflow-hidden bg-cloud py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <LeftContent />
            <div className="hidden h-[420px] lg:block">
              <Silo3D progress={scrollYProgress} still />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // ---------- Desktop: pinned — block turns/swirls on the right ----------
  return (
    <>
      <section ref={ref} id="stats" className="relative hidden bg-cloud lg:block lg:h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-1/2 h-[560px] w-[560px] -translate-y-1/2 translate-x-1/4 rounded-full bg-accent/8 blur-[150px]" />
          </div>

          <Container className="relative w-full">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative z-10">
                <LeftContent figuresStyle={{ opacity: figOpacity, y: figY }} />
              </div>

              {/* 3D sculpture turns + swirls + zooms as you scroll */}
              <div className="relative h-[580px]">
                <div className="absolute inset-y-0 left-[2%] right-[-6%]">
                  <Silo3D progress={scrollYProgress} />
                </div>
              </div>
            </div>
          </Container>

          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-accent via-accent-400 to-sce"
            style={{ scaleX: barScale }}
          />
        </div>
      </section>

      {/* Mobile: static composition */}
      <section className="bg-cloud py-16 lg:hidden">
        <Container>
          <LeftContent />
          <div className="mt-10 h-[340px]">
            <Silo3D progress={scrollYProgress} still />
          </div>
        </Container>
      </section>
    </>
  );
}
