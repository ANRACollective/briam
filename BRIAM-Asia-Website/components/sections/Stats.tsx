"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion, useReducedMotion, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";

// WebGL canvas — client-only.
const Silo3D = dynamic(() => import("@/components/ui/Silo3D"), { ssr: false });

const STATS = [
  { value: "4", label: "Primary Markets" },
  { value: "2", label: "Solution Streams" },
  { value: "1", label: "Regional Exclusive" },
];

export function Stats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Section-pass progress drives the sculpture's swirl as it scrolls through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} id="stats" className="relative overflow-hidden bg-cloud">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-accent/8 blur-[160px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 py-20 md:py-24 lg:min-h-screen lg:grid-cols-2 lg:gap-4 lg:py-0">
          {/* Left — heading, subtext, figures (all visible; figures stagger in) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-xl"
          >
            <Eyebrow className="mb-5">By the numbers</Eyebrow>
            <h2 className="font-display text-[clamp(2.4rem,4.6vw,4rem)] uppercase leading-[0.85] tracking-[-0.02em] text-ink">
              Engineering capability, delivered across Southeast Asia
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              BRIAM Asia operates from Singapore with manufacturing and project
              delivery reach across the region.
            </p>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="border-l-2 border-line pl-4 sm:pl-5"
                >
                  <span className="font-display block text-[clamp(3.2rem,6vw,5.5rem)] leading-none text-accent">
                    {s.value}
                  </span>
                  <span className="font-display mt-3 block text-sm uppercase leading-none tracking-[-0.01em] text-ink sm:text-base">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — big sculpture, bleeding toward the edge, swirling on scroll */}
          <div className="relative h-[54vh] min-h-[440px] lg:h-[86vh]">
            <div className="absolute inset-y-0 left-[-8%] right-[-16%]">
              <Silo3D progress={scrollYProgress} still={!!reduce} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
