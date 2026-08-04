"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { apacMap } from "@/lib/apacMap";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

// One entry per market. `note` is the key city / descriptor shown on the card.
// Card images exported from the Figma "Markets served" grid.
type Market = { name: string; img: string; note: string };

const MARKETS: Market[] = [
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
  { name: "Australia", img: "/images/markets/australia.jpg", note: "Sydney" },
  { name: "New Zealand", img: "/images/markets/new-zealand.jpg", note: "Auckland" },
  { name: "Pacific Islands", img: "/images/markets/pacific-islands.jpg", note: "Fiji & Oceania" },
  { name: "India", img: "/images/markets/india.jpg", note: "New Delhi" },
  { name: "Pakistan", img: "/images/markets/pakistan.jpg", note: "Lahore" },
  { name: "Bangladesh", img: "/images/markets/bangladesh.jpg", note: "Dhaka" },
  { name: "Nepal", img: "/images/markets/nepal.jpg", note: "Kathmandu" },
  { name: "Bhutan", img: "/images/markets/bhutan.jpg", note: "Thimphu" },
  { name: "Maldives", img: "/images/markets/maldives.jpg", note: "Malé" },
  { name: "Sri Lanka", img: "/images/markets/sri-lanka.jpg", note: "Colombo" },
];

const [VBX, VBY, VBW, VBH] = apacMap.viewBox.split(" ").map(Number);
const pctX = (x: number) => `${((x - VBX) / VBW) * 100}%`;
const pctY = (y: number) => `${((y - VBY) / VBH) * 100}%`;

// Markets whose hover card should open downward (pin sits near the top edge).
const OPENS_DOWN = new Set(["Pakistan", "India", "Nepal", "Bhutan", "Bangladesh"]);
// Cards near the right edge anchor right so they stay inside the map.
const NEAR_RIGHT = new Set(["New Zealand", "Pacific Islands"]);

function Pin({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const rings = [0, 0.8, 1.6];
  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      <span
        className={cn(
          "absolute rounded-full bg-accent-400 blur-md transition-all duration-300",
          active ? "h-8 w-8 opacity-70" : "h-5 w-5 opacity-40",
        )}
      />
      {!reduce &&
        rings.map((d, i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full border border-accent-400"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: active ? [1, 4] : [1, 3.2], opacity: [0.55, 0] }}
            transition={{ duration: active ? 1.8 : 2.4, repeat: Infinity, ease: "easeOut", delay: d }}
          />
        ))}
      <motion.span
        className={cn("relative h-3 w-3 rounded-full border-2 border-white", active ? "bg-white" : "bg-accent-400")}
        animate={
          reduce
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 0 rgba(166,121,224,0.6)",
                  "0 0 12px 3px rgba(166,121,224,0.95)",
                  "0 0 0 0 rgba(166,121,224,0.6)",
                ],
              }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
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
  const markets = MARKETS.filter((m) => apacMap.pins[m.name]);

  return (
    <section id="markets" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />
      </div>
      <Container className="relative">
        <div className="mb-10 max-w-2xl md:mb-14">
          <Eyebrow tone="light" className="mb-5">Coverage</Eyebrow>
          <h2 className="type-h2">
            Markets served
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Delivering structural steel and silo projects across twenty
            Asia-Pacific markets — from the Indian subcontinent to the Pacific
            islands.
          </p>
        </div>

        {/* ---------- Desktop: interactive Asia-Pacific map ---------- */}
        <div
          className="relative mx-auto hidden w-full max-w-[1160px] lg:block"
          style={{ aspectRatio: `${VBW} / ${VBH}` }}
        >
          <svg viewBox={apacMap.viewBox} className="absolute inset-0 h-full w-full" aria-hidden>
            {apacMap.countries.map((c) => {
              const isMarket = c.highlight;
              const isActive =
                active === c.name || (c.pacific && active === "Pacific Islands");
              return (
                <path
                  key={c.name}
                  d={c.d}
                  className="transition-all duration-300"
                  fill={isActive ? "#8a4fd6" : isMarket ? "rgba(119,61,189,0.30)" : "rgba(255,255,255,0.05)"}
                  stroke={isMarket ? "rgba(166,121,224,0.9)" : "rgba(255,255,255,0.12)"}
                  strokeWidth={isActive ? 2 : 1}
                />
              );
            })}
          </svg>

          {/* pins + hover-reveal cards */}
          {markets.map((m) => {
            const [px, py] = apacMap.pins[m.name];
            const down = OPENS_DOWN.has(m.name);
            const right = NEAR_RIGHT.has(m.name);
            return (
              <div
                key={`pin-${m.name}`}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  active === m.name ? "z-50" : "z-10",
                )}
                style={{ left: pctX(px), top: pctY(py) }}
              >
                <button
                  className="block cursor-pointer rounded-full"
                  onMouseEnter={() => setActive(m.name)}
                  onMouseLeave={() => setActive((a) => (a === m.name ? null : a))}
                  onFocus={() => setActive(m.name)}
                  onBlur={() => setActive((a) => (a === m.name ? null : a))}
                  aria-label={`${m.name} — ${m.note}`}
                >
                  <Pin active={active === m.name} />
                </button>
                {active === m.name && (
                  <motion.div
                    className={cn(
                      "absolute z-30 w-[220px]",
                      right ? "right-0" : "left-1/2 -translate-x-1/2",
                    )}
                    style={down ? { top: "calc(50% + 14px)" } : { bottom: "calc(50% + 14px)" }}
                    initial={{ opacity: 0, y: down ? -8 : 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="overflow-hidden rounded-lg border border-white/20 bg-ink shadow-xl">
                      <CardInner m={m} />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* ---------- Mobile: clean grid ---------- */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {MARKETS.map((m) => (
            <div key={`m-${m.name}`} className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
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
      </Container>
    </section>
  );
}
