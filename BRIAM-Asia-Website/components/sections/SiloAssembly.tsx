"use client";

import { Eyebrow } from "@/components/ui/Section";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

/** A single isometric metallic "square-silo" block.
 *  Uses SOLID face fills (not SVG gradients) so the metal never drops to black
 *  when the block is composited under a CSS transform. */
function IsoBlock({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" className="drop-shadow-[0_10px_16px_rgba(0,0,0,0.28)]">
      {/* top face (brightest) */}
      <path d="M110 25 L200 72 L110 119 L20 72 Z" fill="#f4f6f8" stroke="#b7bdc4" strokeWidth="1.5" />
      {/* left face */}
      <path d="M20 72 L110 119 L110 205 L20 158 Z" fill="#d9dee3" stroke="#aab0b7" strokeWidth="1.5" />
      {/* right face (darkest) */}
      <path d="M200 72 L110 119 L110 205 L200 158 Z" fill="#c1c7ce" stroke="#9aa1a8" strokeWidth="1.5" />
      {/* seams */}
      <path d="M65 48 L65 182 M155 48 L155 182" stroke="#aeb4bb" strokeWidth="1" opacity="0.5" />
      <path d="M20 115 L110 162 L200 115" fill="none" stroke="#9aa1a8" strokeWidth="1" opacity="0.45" />
      {/* accent rim on the leading top edge */}
      <path d="M110 25 L200 72" stroke="#a679e0" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

type Cfg = {
  ax: number; ay: number; // assembled offset from center
  sx: number; sy: number; sr: number; // scattered start + rotation
  t0: number; t1: number; // scroll sub-range for convergence
};

// Six blocks that fly in and assemble into a compact 2×3 square-silo cluster
// (two columns, three rows) — non-overlapping so every block stays lit.
const BLOCKS: Cfg[] = [
  { ax: -108, ay: 122, sx: -430, sy: -280, sr: -42, t0: 0.05, t1: 0.58 },
  { ax: 108, ay: 122, sx: 450, sy: -210, sr: 38, t0: 0.1, t1: 0.63 },
  { ax: -108, ay: 0, sx: -490, sy: 60, sr: -28, t0: 0.16, t1: 0.69 },
  { ax: 108, ay: 0, sx: 470, sy: 180, sr: 32, t0: 0.22, t1: 0.75 },
  { ax: -108, ay: -122, sx: -380, sy: 320, sr: -36, t0: 0.28, t1: 0.82 },
  { ax: 108, ay: -122, sx: 380, sy: -340, sr: 44, t0: 0.34, t1: 0.9 },
];

function Block({
  scrollY,
  cfg,
  reduce,
}: {
  scrollY: MotionValue<number>;
  cfg: Cfg;
  reduce: boolean;
}) {
  const x = useTransform(scrollY, [cfg.t0, cfg.t1], [cfg.sx, cfg.ax]);
  const y = useTransform(scrollY, [cfg.t0, cfg.t1], [cfg.sy, cfg.ay]);
  const rotate = useTransform(scrollY, [cfg.t0, cfg.t1], [cfg.sr, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[75px] -mt-[75px]"
      style={reduce ? { x: cfg.ax, y: cfg.ay } : { x, y, rotate }}
    >
      <IsoBlock />
    </motion.div>
  );
}

export function SiloAssembly() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // headline copy + end label timing
  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0.35]);
  const doneOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const doneY = useTransform(scrollYProgress, [0.82, 0.95], [16, 0]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="assembly" className="relative h-[280vh] bg-ink">
      {/* pinned stage */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ambient */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[160px]" />
        </div>

        {/* headline */}
        <motion.div
          style={reduce ? undefined : { opacity: introOpacity }}
          className="absolute left-1/2 top-[12%] z-10 w-full max-w-2xl -translate-x-1/2 px-6 text-center"
        >
          <Eyebrow tone="light" className="mb-4 justify-center">The BRIAM System</Eyebrow>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white">
            Assembled block by block
          </h2>
        </motion.div>

        {/* assembly stage */}
        <motion.div
          className="relative h-[540px] w-full max-w-3xl"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {BLOCKS.map((cfg, i) => (
            <Block key={i} scrollY={scrollYProgress} cfg={cfg} reduce={!!reduce} />
          ))}
          {/* soft ground shadow under the assembled tower */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-6 w-56 -translate-x-1/2 translate-y-[240px] rounded-[50%] bg-black/50 blur-xl"
          />
        </motion.div>

        {/* end label */}
        <motion.p
          style={reduce ? undefined : { opacity: doneOpacity, y: doneY }}
          className="absolute bottom-[14%] left-1/2 z-10 -translate-x-1/2 px-6 text-center text-lg text-white/80"
        >
          Precision steel blocks &rarr; a complete square-silo system.
        </motion.p>

        {/* scrub progress bar */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-accent via-accent-400 to-sce"
            style={{ scaleX: barScale }}
          />
        )}
      </div>
    </section>
  );
}
