"use client";

import { Container } from "@/components/ui/Container";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const S = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/**
 * Ambient icon system (client note): the icons come alive the moment the
 * section is in view — no hover required. Each icon takes its turn in a
 * gentle periodic rhythm (staggered start, ~5s cycle with calm pauses),
 * confirmed with ANRA over "continuous loop". All loops are gated behind
 * `useInView` on the list (so nothing animates off-screen) and fully
 * disabled under prefers-reduced-motion.
 */

// Shared rhythm: each icon animates for ~1.8s, rests ~3.4s, and icons are
// offset by 0.85s each so they visibly "take turns" instead of firing at once.
const CYCLE_REST = 3.4;
const STAGGER = 0.85;
const EASE = [0.22, 1, 0.36, 1] as const;

const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true as const,
};

// SVG transform sanity: rotate/scale around each element's own box.
const center = { transformBox: "fill-box", transformOrigin: "center" } as const;

/* 01 — Crosshair: centre dot swells + drifts while the tick marks breathe out */
function CrosshairIcon({ on, delay }: { on: boolean; delay: number }) {
  return (
    <svg {...svgProps}>
      <motion.circle
        cx="12"
        cy="12"
        r="3.2"
        {...S}
        style={center}
        animate={
          on
            ? { scale: [1, 1.28, 1, 1.28, 1], x: [0, 1.2, -1.2, 0.6, 0], y: [0, -1, 1, -0.5, 0] }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay }}
      />
      <motion.path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        {...S}
        style={center}
        animate={on ? { scale: [1, 1.1, 1], opacity: [1, 0.55, 1] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay }}
      />
    </svg>
  );
}

/* 02 — Four squares: each pane lights up purple in sequence, like windows */
function SquaresIcon({ on, delay }: { on: boolean; delay: number }) {
  const rects = [
    { x: 3, y: 3 },
    { x: 13, y: 3 },
    { x: 13, y: 13 },
    { x: 3, y: 13 },
  ];
  return (
    <svg {...svgProps}>
      {rects.map((r, idx) => (
        <motion.rect
          key={idx}
          x={r.x}
          y={r.y}
          width="8"
          height="8"
          rx="1.5"
          {...S}
          style={center}
          animate={
            on
              ? {
                  fill: ["rgba(119,61,189,0)", "rgba(119,61,189,0.38)", "rgba(119,61,189,0)"],
                  scale: [1, 1.12, 1],
                }
              : { fill: "rgba(119,61,189,0)", scale: 1 }
          }
          transition={{
            duration: 0.9,
            ease: "easeInOut",
            repeat: on ? Infinity : 0,
            // rest = shared cycle minus this icon's own active window
            repeatDelay: CYCLE_REST + 1.8 - 0.9,
            delay: delay + idx * 0.22,
          }}
        />
      ))}
    </svg>
  );
}

/* 03 — House: the doorway glows warm purple, roofline gives a soft breath */
function HouseIcon({ on, delay }: { on: boolean; delay: number }) {
  return (
    <svg {...svgProps}>
      <motion.path
        d="M3 21h18M6 21V8l6-5 6 5v13"
        {...S}
        style={center}
        animate={on ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay }}
      />
      {/* glowing door fill */}
      <motion.path
        d="M10 21v-6h4v6h-4z"
        stroke="none"
        animate={
          on
            ? { fill: ["rgba(119,61,189,0)", "rgba(119,61,189,0.45)", "rgba(119,61,189,0)"] }
            : { fill: "rgba(119,61,189,0)" }
        }
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay: delay + 0.15 }}
      />
      <motion.path
        d="M10 21v-6h4v6"
        {...S}
        style={center}
        animate={on ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay: delay + 0.15 }}
      />
    </svg>
  );
}

/* 04 — Shield: the tick draws itself in, holds, then fades to draw again */
function ShieldIcon({ on, delay }: { on: boolean; delay: number }) {
  return (
    <svg {...svgProps}>
      <motion.path
        d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z"
        {...S}
        style={center}
        animate={on ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: on ? Infinity : 0, repeatDelay: CYCLE_REST, delay }}
      />
      <motion.path
        d="M9 12l2 2 4-4"
        {...S}
        strokeWidth={2}
        animate={on ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : { pathLength: 1, opacity: 1 }}
        transition={{
          duration: 1.8,
          times: [0, 0.35, 0.75, 1],
          ease: EASE,
          repeat: on ? Infinity : 0,
          repeatDelay: CYCLE_REST,
          delay: delay + 0.1,
        }}
      />
    </svg>
  );
}

const ITEMS = [
  {
    Icon: CrosshairIcon,
    title: "Turnkey silo projects",
    body: "Full engineering and construction delivery via SCE and Silbloxx.",
  },
  {
    Icon: SquaresIcon,
    title: "Standalone steel structures",
    body: "Exclusive regional delivery via SCE RD Steel Alliance — independent of silo projects.",
  },
  {
    Icon: HouseIcon,
    title: "Prefabricated construction",
    body: "Silbloxx modular building systems for faster on-site delivery.",
  },
  {
    // Boss comment #10: compliance framed around each market's own rules
    Icon: ShieldIcon,
    title: "Building-norm compliance",
    body: "European-grade engineering, certified to each country's building norms.",
  },
];

export function RegionalPresence() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  // NOT once: the ambient loops run whenever the section is on screen and
  // stop (and reset) when the user scrolls away — no wasted rAF off-screen.
  const listInView = useInView(listRef, { amount: 0.25 });
  const on = listInView && !reduce;

  return (
    <section id="regional" className="scroll-mt-24 bg-cloud section-pad">
      <Container>
        <div className="mb-12 max-w-2xl">
          <h2 className="type-h2 text-ink">
            Rooted in Singapore, <span className="text-accent">building across the region</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg lg:h-[500px] lg:aspect-auto"
          >
            <Image
              src="/images/city-singapore.jpg"
              alt="Singapore skyline across Marina Bay"
              fill
              sizes="(max-width:1024px) 100vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
              <span className="relative flex h-3 w-3">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                )}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
              <span className="font-display text-xl uppercase tracking-[-0.01em]">Singapore HQ</span>
            </div>
          </motion.div>

          {/* items */}
          <ul ref={listRef} className="flex flex-col gap-4">
            {ITEMS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex items-start gap-5 overflow-hidden rounded-lg border border-line/60 bg-white p-5 transition-colors duration-300 hover:border-accent/40"
              >
                {/* Boxless ambient icon: animates while in view, extra lift + tilt on hover */}
                <span className="relative mt-0.5 flex shrink-0 items-center justify-center text-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110">
                  <item.Icon on={on} delay={i * STAGGER} />
                </span>
                <div className="relative">
                  <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.2] text-ink/70">{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
