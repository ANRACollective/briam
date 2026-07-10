"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { seaMap } from "@/lib/seaMap";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type Meta = { img: string; note: string; dx: number; dy: number };
// dx/dy offset the floating card into open sea space; a dashed line tethers it
// back to the pin on the country (values are in the 1000×820 map viewBox).
const META: Record<string, Meta> = {
  Myanmar: { img: "/images/city-myanmar.jpg", note: "Yangon", dx: -24, dy: -95 },
  Thailand: { img: "/images/city-skyline.jpg", note: "Bangkok", dx: -135, dy: 3 },
  Cambodia: { img: "/images/city-oldtown-2.jpg", note: "Phnom Penh", dx: -129, dy: 85 },
  Vietnam: { img: "/images/city-oldtown.jpg", note: "Ho Chi Minh City", dx: 105, dy: -55 },
  Singapore: { img: "/images/city-singapore-2.jpg", note: "Regional HQ", dx: -118, dy: 82 },
  Malaysia: { img: "/images/city-kl.jpg", note: "Kuala Lumpur", dx: 230, dy: 44 },
  Indonesia: { img: "/images/city-skyline-2.jpg", note: "Jakarta", dx: 127, dy: 100 },
  Philippines: { img: "/images/city-nightmarket.jpg", note: "Manila", dx: 151, dy: -32 },
};

const [VBW, VBH] = seaMap.viewBox.split(" ").slice(2).map(Number);
const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const markets = seaMap.countries.filter((c) => c.highlight && META[c.name]);

function Pin({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  // staggered ring emission delays for a continuous "sonar" wave
  const rings = [0, 0.8, 1.6];
  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      {/* soft ambient glow */}
      <span
        className={cn(
          "absolute rounded-full bg-accent-400 blur-md transition-all duration-300",
          active ? "h-8 w-8 opacity-70" : "h-5 w-5 opacity-40",
        )}
      />
      {/* emitting waves */}
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
      {/* twinkling core */}
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

function CardInner({ name }: { name: string }) {
  const m = META[name];
  return (
    <>
      <div className="relative h-16 w-full">
        <Image src={m.img} alt={name} fill sizes="180px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
      </div>
      <div className="px-3 py-2">
        <p className="font-display text-base uppercase leading-none tracking-[-0.01em] text-white">{name}</p>
        <p className="mt-1 text-[11px] text-white/60">{m.note}</p>
      </div>
    </>
  );
}

export function MarketsMap({ variant = "cards" }: { variant?: "cards" | "pins" }) {
  const [active, setActive] = useState<string | null>(null);
  const isCards = variant === "cards";

  return (
    <section id="markets" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />
      </div>
      <Container className="relative">
        <div className="mb-10 max-w-2xl md:mb-14">
          <Eyebrow tone="light" className="mb-5">Coverage</Eyebrow>
          <h2 className="font-display text-[clamp(2.6rem,5vw,4rem)] uppercase leading-[0.85] tracking-[-0.02em]">
            Markets served
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Delivering structural steel and silo projects across eight Southeast
            Asian markets.
          </p>
        </div>

        {/* ---------- Desktop: interactive map ---------- */}
        <div
          className="relative mx-auto hidden w-full max-w-[960px] lg:block"
          style={{ aspectRatio: `${VBW} / ${VBH}` }}
        >
          <svg viewBox={seaMap.viewBox} className="absolute inset-0 h-full w-full" aria-hidden>
            {seaMap.countries.map((c) => {
              const isMarket = c.highlight && !!META[c.name];
              const isActive = active === c.name;
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

          {/* connector lines (cards only) */}
          {isCards && (
            <svg viewBox={seaMap.viewBox} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              {markets.map((c) => {
                const m = META[c.name];
                return (
                  <line
                    key={c.name}
                    x1={c.cx} y1={c.cy} x2={c.cx + m.dx} y2={c.cy + m.dy}
                    stroke={active === c.name ? "rgba(166,121,224,0.95)" : "rgba(166,121,224,0.45)"}
                    strokeWidth="1" strokeDasharray="3 3"
                  />
                );
              })}
            </svg>
          )}

          {/* pins + interaction */}
          {markets.map((c) => (
            <div
              key={`pin-${c.name}`}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2",
                // active pin sits above all others so its card fully covers nearby dots
                active === c.name ? "z-50" : "z-10",
              )}
              style={{ left: pct(c.cx, VBW), top: pct(c.cy, VBH) }}
            >
              <button
                className="block cursor-pointer rounded-full"
                onMouseEnter={() => setActive(c.name)}
                onMouseLeave={() => setActive((a) => (a === c.name ? null : a))}
                onFocus={() => setActive(c.name)}
                onBlur={() => setActive((a) => (a === c.name ? null : a))}
                aria-label={`${c.name} — ${META[c.name].note}`}
              >
                <Pin active={active === c.name} />
              </button>
              {/* pins variant: popover card on hover */}
              {!isCards && active === c.name && (
                <motion.div
                  className="absolute left-1/2 z-30 w-[176px] -translate-x-1/2"
                  style={{ bottom: "calc(50% + 14px)" }}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="overflow-hidden rounded-lg border border-white/20 bg-ink shadow-xl">
                    <CardInner name={c.name} />
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          {/* floating cards (cards variant) */}
          {isCards && markets.map((c, i) => {
            const m = META[c.name];
            return (
              <motion.button
                key={`card-${c.name}`}
                className="absolute z-20 w-[150px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/15 bg-ink/80 text-left shadow-xl backdrop-blur-sm focus:z-30"
                style={{ left: pct(c.cx + m.dx, VBW), top: pct(c.cy + m.dy, VBH) }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.05 }}
                onMouseEnter={() => setActive(c.name)}
                onMouseLeave={() => setActive((a) => (a === c.name ? null : a))}
                onFocus={() => setActive(c.name)}
                onBlur={() => setActive((a) => (a === c.name ? null : a))}
                aria-label={`${c.name} — ${m.note}`}
              >
                <CardInner name={c.name} />
              </motion.button>
            );
          })}
        </div>

        {/* ---------- Mobile: clean grid ---------- */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {markets.map((c) => (
            <div key={`m-${c.name}`} className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
              <div className="relative h-24 w-full">
                <Image src={META[c.name].img} alt={c.name} fill sizes="200px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              </div>
              <div className="px-3 py-2">
                <p className="font-display text-lg uppercase leading-none tracking-[-0.01em]">{c.name}</p>
                <p className="mt-1 text-[11px] text-white/60">{META[c.name].note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
