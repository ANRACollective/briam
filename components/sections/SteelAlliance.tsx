"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion } from "motion/react";

const TILES = [
  { title: "Industrial buildings", sub: "Warehouses, factories, facilities" },
  { title: "Process structures", sub: "Platforms, walkways, support frames" },
  { title: "Steel fabrication", sub: "Custom engineering to spec" },
  { title: "Turnkey delivery", sub: "Design, supply, and installation" },
];

export function SteelAlliance() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28">
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-sce/15 blur-[130px]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="light" className="mb-5">SCE RD Steel Alliance</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.4rem,5vw,3.6rem)] uppercase leading-[0.85] tracking-[-0.02em]"
            >
              Standalone structural steel, delivered across Southeast Asia.
            </motion.h2>
          </div>
          <p className="max-w-md text-lg text-white/75 md:text-xl">
            BRIAM Asia is the sole regional agent for the SCE RD Steel Alliance —
            bringing European-grade structural steel engineering directly to the SEA
            market, independent of any silo project.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-md border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent-400/60 hover:bg-white/[0.1]"
            >
              <h3 className="font-display text-[2rem] uppercase leading-[0.85] tracking-[-0.02em] text-white transition-colors group-hover:text-accent-400">
                {tile.title}
              </h3>
              <p className="mt-3 text-white/70">{tile.sub}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
