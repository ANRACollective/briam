"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion } from "motion/react";

const STATS = [
  { value: 4, label: "Primary Markets" },
  { value: 2, label: "Solution Streams" },
  { value: 1, label: "Regional Exclusive" },
];

export function Stats() {
  return (
    <section id="stats" className="scroll-mt-24 bg-cloud py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow className="mb-5">By the numbers</Eyebrow>
          <h2 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] uppercase leading-[0.85] tracking-[-0.02em] text-ink">
            Engineering capability, delivered across Southeast Asia
          </h2>
          <p className="mt-6 text-lg text-ink/70">
            BRIAM Asia operates from Singapore with manufacturing and project delivery
            reach across the region.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-line pl-8"
            >
              <AnimatedCounter
                value={stat.value}
                className="block text-[5rem] font-bold leading-none text-accent"
              />
              <h3 className="font-display mt-4 text-2xl uppercase leading-none tracking-[-0.02em] text-ink">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
