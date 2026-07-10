"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

function Icon({ path }: { path: ReactNode }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      {path}
    </svg>
  );
}

const S = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ITEMS = [
  {
    icon: <><circle cx="12" cy="12" r="3.2" {...S} /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" {...S} /></>,
    title: "Turnkey silo projects",
    body: "Full engineering and construction delivery via SCE and Silbloxx.",
  },
  {
    icon: <><rect x="3" y="3" width="8" height="8" rx="1.5" {...S} /><rect x="13" y="3" width="8" height="8" rx="1.5" {...S} /><rect x="3" y="13" width="8" height="8" rx="1.5" {...S} /><rect x="13" y="13" width="8" height="8" rx="1.5" {...S} /></>,
    title: "Standalone steel structures",
    body: "Exclusive regional delivery via SCE RD Steel Alliance — independent of silo projects.",
  },
  {
    icon: <><path d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-6h4v6" {...S} /></>,
    title: "Prefabricated construction",
    body: "Silbloxx modular building systems for faster on-site delivery.",
  },
  {
    icon: <><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" {...S} /><path d="M9 12l2 2 4-4" {...S} /></>,
    title: "European compliance",
    body: "Engineering standards aligned with EU norms and certifications.",
  },
];

export function RegionalPresence() {
  const reduce = useReducedMotion();
  return (
    <section id="regional" className="scroll-mt-24 bg-cloud py-20 md:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <Eyebrow className="mb-5">Regional Presence</Eyebrow>
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                )}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-400" />
              </span>
              <span className="font-display text-xl uppercase tracking-[-0.01em]">Singapore HQ</span>
            </div>
          </motion.div>

          {/* items */}
          <ul className="flex flex-col gap-4">
            {ITEMS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-5 rounded-lg border border-line/60 bg-white p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-28px_rgba(119,61,189,0.6)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon path={item.icon} />
                </span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
