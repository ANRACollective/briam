"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { apacMap } from "@/lib/apacMap";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

/**
 * Markets served — Asia-Pacific map (boss revision):
 * - every serviced country filled solid brand purple
 * - no persistent dots/pins
 * - hovering a country (or its entry in the region list) pulses at its capital
 *   and reveals the market card
 * - region-grouped country list sits beside the map
 */

type Market = { name: string; img: string; note: string };

const REGIONS: { region: string; markets: Market[] }[] = [
  {
    region: "Southeast Asia",
    markets: [
      { name: "Singapore", img: "/images/markets/singapore.jpg", note: "Regional HQ" },
      { name: "Malaysia", img: "/images/markets/malaysia.jpg", note: "Kuala Lumpur" },
      { name: "Thailand", img: "/images/markets/thailand.jpg", note: "Bangkok" },
      { name: "Vietnam", img: "/images/markets/vietnam.jpg", note: "Ho Chi Minh City" },
      { name: "Cambodia", img: "/images/markets/cambodia.jpg", note: "Phnom Penh" },
      { name: "Myanmar", img: "/images/markets/myanmar.jpg", note: "Yangon" },
      { name: "Laos", img: "/images/markets/laos.jpg", note: "Vientiane" },
      { name: "Brunei", img: "/images/markets/brunei.jpg", note: "Bandar Seri Begawan" },
      { name: "Indonesia", img: "/images/markets/indonesia.jpg", note: "Jakarta" },
      { name: "Philippines", img: "/images/markets/philippines.jpg", note: "Manila" },
    ],
  },
  {
    region: "South Asia",
    markets: [
      { name: "India", img: "/images/markets/india.jpg", note: "New Delhi" },
      { name: "Pakistan", img: "/images/markets/pakistan.jpg", note: "Lahore" },
      { name: "Bangladesh", img: "/images/markets/bangladesh.jpg", note: "Dhaka" },
      { name: "Nepal", img: "/images/markets/nepal.jpg", note: "Kathmandu" },
      { name: "Bhutan", img: "/images/markets/bhutan.jpg", note: "Thimphu" },
      { name: "Maldives", img: "/images/markets/maldives.jpg", note: "Malé" },
      { name: "Sri Lanka", img: "/images/markets/sri-lanka.jpg", note: "Colombo" },
    ],
  },
  {
    region: "Oceania",
    markets: [
      { name: "Australia", img: "/images/markets/australia.jpg", note: "Sydney" },
      { name: "New Zealand", img: "/images/markets/new-zealand.jpg", note: "Auckland" },
      { name: "Pacific Islands", img: "/images/markets/pacific-islands.jpg", note: "Fiji & Oceania" },
    ],
  },
];

const ALL_MARKETS = REGIONS.flatMap((r) => r.markets);
const BY_NAME = new Map(ALL_MARKETS.map((m) => [m.name, m]));

const [VBX, VBY, VBW, VBH] = apacMap.viewBox.split(" ").map(Number);
const pctX = (x: number) => `${((x - VBX) / VBW) * 100}%`;
const pctY = (y: number) => `${((y - VBY) / VBH) * 100}%`;

// Countries too small to hover reliably get an invisible hit area at the capital.
const TINY = new Set(["Singapore", "Brunei", "Maldives", "Sri Lanka", "Pacific Islands"]);
// Cards that would clip the top edge open downward instead.
const OPENS_DOWN = new Set(["Pakistan", "India", "Nepal", "Bhutan", "Bangladesh"]);
// Cards near the right edge anchor right so they stay inside the map.
const NEAR_RIGHT = new Set(["New Zealand", "Pacific Islands"]);

// The Pacific Islands entry maps to several country paths (Fiji group).
const activates = (countryName: string, pacific: boolean | undefined, active: string | null) =>
  active === countryName || (pacific && active === "Pacific Islands");

/** Subtle expanding pulse at the country's capital — only while hovered. */
function CapitalPulse() {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />;
  }
  return (
    <span className="pointer-events-none relative flex h-3 w-3 items-center justify-center">
      {[0, 0.7].map((d) => (
        <motion.span
          key={d}
          className="absolute h-3 w-3 rounded-full border border-white/80"
          initial={{ scale: 0.6, opacity: 0.7 }}
          animate={{ scale: [0.6, 3.4], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: d }}
        />
      ))}
      <span className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]" />
    </span>
  );
}

function CardInner({ m }: { m: Market }) {
  return (
    <>
      <div className="relative h-24 w-full">
        <Image src={m.img} alt={m.name} fill sizes="230px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
      </div>
      <div className="px-3 py-2">
        <p className="font-display text-base uppercase leading-none tracking-[-0.01em] text-white">{m.name}</p>
        <p className="mt-1 text-[11px] text-white/60">{m.note}</p>
      </div>
    </>
  );
}

export function MarketsMap() {
  const [active, setActive] = useState<string | null>(null);
  const enter = (name: string) => setActive(name);
  const leave = (name: string) => setActive((a) => (a === name ? null : a));

  return (
    <section id="markets" className="relative scroll-mt-24 overflow-hidden bg-ink text-white section-pad">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />
      </div>
      <Container className="relative">
        {/* Mobile heading (desktop heading lives in the 3-column grid below) */}
        <div className="mb-10 max-w-2xl lg:hidden">
          <h2 className="type-h2">
            Markets served
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Delivering structural steel and silo projects across twenty
            Asia-Pacific markets — from the Indian subcontinent to the Pacific
            islands.
          </p>
        </div>

        {/* ---------- Desktop: heading | map | regions (3 columns) ---------- */}
        <div className="hidden grid-cols-[230px_minmax(0,1fr)_230px] items-center gap-10 lg:grid xl:grid-cols-[260px_minmax(0,1fr)_270px]">
          <div className="self-center">
            <h2 className="type-h2">
              Markets served
            </h2>
            <p className="mt-5 text-base text-white/70">
              Structural steel and silo projects across twenty Asia-Pacific
              markets — from the Indian subcontinent to the Pacific islands.
            </p>
          </div>
          <div className="relative w-full" style={{ aspectRatio: `${VBW} / ${VBH}` }}>
            <svg viewBox={apacMap.viewBox} className="absolute inset-0 h-full w-full" aria-hidden>
              {apacMap.countries.map((c) => {
                const isActive = activates(c.name, c.pacific, active);
                const hoverName = c.pacific ? "Pacific Islands" : c.name;
                return (
                  <path
                    key={c.name}
                    d={c.d}
                    className={cn("transition-all duration-300", c.highlight && "cursor-pointer")}
                    fill={
                      isActive
                        ? "var(--color-accent-600)"
                        : c.highlight
                          ? "var(--color-accent)"
                          : "rgba(255,255,255,0.05)"
                    }
                    stroke={c.highlight ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? 1.6 : 0.8}
                    onMouseEnter={c.highlight ? () => enter(hoverName) : undefined}
                    onMouseLeave={c.highlight ? () => leave(hoverName) : undefined}
                  />
                );
              })}
            </svg>

            {/* invisible hit areas for tiny markets (no visible dots) */}
            {ALL_MARKETS.filter((m) => TINY.has(m.name) && apacMap.pins[m.name]).map((m) => {
              const [px, py] = apacMap.pins[m.name];
              return (
                <button
                  key={`hit-${m.name}`}
                  className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
                  style={{ left: pctX(px), top: pctY(py) }}
                  onMouseEnter={() => enter(m.name)}
                  onMouseLeave={() => leave(m.name)}
                  onFocus={() => enter(m.name)}
                  onBlur={() => leave(m.name)}
                  aria-label={`${m.name} — ${m.note}`}
                  tabIndex={-1}
                />
              );
            })}

            {/* capital pulse + hover card for the active market */}
            {ALL_MARKETS.map((m) => {
              if (active !== m.name || !apacMap.pins[m.name]) return null;
              const [px, py] = apacMap.pins[m.name];
              const down = OPENS_DOWN.has(m.name);
              const right = NEAR_RIGHT.has(m.name);
              return (
                <div
                  key={`active-${m.name}`}
                  className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pctX(px), top: pctY(py) }}
                >
                  <CapitalPulse />
                  <AnimatePresence>
                    <motion.div
                      className={cn(
                        "absolute w-[220px]",
                        right ? "right-0" : "left-1/2 -translate-x-1/2",
                      )}
                      style={down ? { top: "calc(50% + 16px)" } : { bottom: "calc(50% + 16px)" }}
                      initial={{ opacity: 0, y: down ? -8 : 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="overflow-hidden rounded-lg border border-white/20 bg-ink shadow-xl">
                        <CardInner m={m} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Region-grouped country list — hovering an entry lights the map */}
          <div className="flex flex-col gap-8 self-center">
            {REGIONS.map((group) => (
              <div key={group.region}>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  <span aria-hidden className="h-px w-5 bg-accent" />
                  {group.region}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {group.markets.map((m) => (
                    <li key={m.name}>
                      <button
                        type="button"
                        onMouseEnter={() => enter(m.name)}
                        onMouseLeave={() => leave(m.name)}
                        onFocus={() => enter(m.name)}
                        onBlur={() => leave(m.name)}
                        className={cn(
                          "font-display cursor-pointer text-lg uppercase leading-tight tracking-[-0.01em] transition-colors duration-200",
                          active === m.name ? "text-accent" : "text-white/85 hover:text-accent",
                        )}
                        aria-label={`${m.name} — ${m.note}`}
                      >
                        {m.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Mobile: region-grouped grid ---------- */}
        <div className="flex flex-col gap-10 lg:hidden">
          {REGIONS.map((group) => (
            <div key={`m-${group.region}`}>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                <span aria-hidden className="h-px w-5 bg-accent" />
                {group.region}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {group.markets.map((m) => (
                  <div key={`mt-${m.name}`} className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
                    <div className="relative h-24 w-full">
                      <Image src={m.img} alt={m.name} fill sizes="200px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    </div>
                    <div className="px-3 py-2">
                      <p className="font-display text-lg uppercase leading-none tracking-[-0.01em]">{m.name}</p>
                      <p className="mt-1 text-[11px] text-white/60">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
