"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "motion/react";

const TILES = [
  { title: "Industrial buildings", sub: "Warehouses, factories, facilities" },
  { title: "Process structures", sub: "Platforms, walkways, support frames" },
  { title: "Steel fabrication", sub: "Custom engineering to spec" },
  { title: "Turnkey delivery", sub: "Design, supply, and installation" },
];

// Second row per the Figma design (boss: bottom boxes were missing).
const TILES_ROW2 = [
  { title: "Industrial buildings", sub: "Warehouses, factories, facilities" },
  { title: "Steel fabrication", sub: "Custom engineering to spec" },
  { title: "Turnkey delivery", sub: "Design, supply, and installation" },
];

function Tile({
  tile,
  i,
  compact = false,
}: {
  tile: { title: string; sub: string };
  i: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-md border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:bg-white/[0.12]"
    >
      {/* radial glow, revealed on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at 30% 20%, rgba(119,61,189,0.28), transparent 70%)",
        }}
      />
      <h3
        className={
          compact
            ? "font-display relative text-[1.75rem] uppercase leading-[0.9] tracking-[-0.02em] text-white transition-colors group-hover:text-accent"
            : "font-display relative text-[2.5rem] uppercase leading-[0.85] tracking-[-0.02em] text-white transition-colors group-hover:text-accent"
        }
      >
        {tile.title}
      </h3>
      <p className={compact ? "relative mt-2 text-base leading-snug text-white/85" : "relative mt-4 text-lg leading-snug text-white/85"}>
        {tile.sub}
      </p>
    </motion.div>
  );
}

export function SteelAlliance() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-ink text-white section-pad">
      {/* Figma "Pattern1" — dot-grid matrix behind the content, plus faint depth glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/12 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-sce/10 blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="type-h2"
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

        {/* Readability pass (boss comment #4): larger Druk titles, clearer subs,
            left-aligned, glassier tiles per Figma. Hover = soft radial purple
            glow (motion sticky), subtle and non-distracting. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, i) => (
            <Tile key={`r1-${tile.title}`} tile={tile} i={i} />
          ))}
        </div>

        {/* Second row (Figma) — three wider tiles */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TILES_ROW2.map((tile, i) => (
            <Tile key={`r2-${tile.title}`} tile={tile} i={i} compact />
          ))}
        </div>
      </Container>
    </section>
  );
}
