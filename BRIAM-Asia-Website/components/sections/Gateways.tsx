"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

/**
 * Gateways — 4-panel accordion (Figma redesign).
 * BRIAM leads as the parent company (01, open by default); SCE, Silbloxx and
 * the SCE-RD Steel Alliance sit beside it. Clicking a panel's "+" expands it
 * into a full photo with a compact floating info card (kept small so the
 * image breathes — boss feedback).
 */

type Panel = {
  n: string;
  short: string; // collapsed label
  wordmark: React.ReactNode;
  heading: string;
  lead: string;
  body: string;
  image: string;
  imageAlt: string;
};

function SceMark() {
  return (
    <span className="font-display text-xl leading-none tracking-[0.02em] text-sce">
      ✕SCE
    </span>
  );
}

const PANELS: Panel[] = [
  {
    n: "01",
    short: "Your Square Silo Partner",
    wordmark: (
      <Image src="/images/logo-briam-dark.png" alt="BRIAM" width={1200} height={382} className="h-5 w-auto" />
    ),
    heading: "Your square silo partner",
    lead: "Specialised in bulk storage. Active all over the world.",
    body: "We bring multiple companies together, each with their own bulk storage expertise. Our common goal? To create a waste-free world.",
    image: "/images/gateway-briam.jpg",
    imageAlt: "Steel walkways and ductwork inside a BRIAM bulk-storage facility",
  },
  {
    n: "02",
    short: "Tailor-Made Square Silo Projects",
    wordmark: <SceMark />,
    heading: "Tailor-made square silo projects",
    lead: "SCE supplies high-performing, custom-made silo buildings for the biggest names in the feed and food-processing industry worldwide.",
    body: "The company delivers the highest level of project management and engineering, catering to end customers and handling large-scale projects. Their expertise in managing complex projects globally ensures you receive excellence at every stage.",
    image: "/images/gateway-sce.jpg",
    imageAlt: "Tailor-made square silo buildings by SCE",
  },
  {
    n: "03",
    short: "Silo-Only Product Supplier",
    wordmark: (
      <span className="font-display text-lg leading-none tracking-[0.14em] text-ink">SILBLOXX</span>
    ),
    heading: "Silo-only product supplier",
    lead: "Silbloxx offers silo-only products by catering to machine builders and system integrators as well as the members of the BRIAM-Group.",
    body: "By making its products accessible through an online configurator, it can deliver unparalleled ease of doing business and efficiency. The company has the most advanced production facilities for silo parts in the world. This ensures a product of the highest quality produced in a sustainable and cost-effective manner.",
    image: "/images/gateway-silbloxx.jpg",
    imageAlt: "Silbloxx silo cladding being installed on site",
  },
  {
    n: "04",
    short: "SCE-RD Steel Alliance",
    wordmark: (
      <span className="font-display text-lg leading-none tracking-[0.02em] text-accent">SCE-RD</span>
    ),
    heading: "SCE-RD Steel Alliance",
    lead: "BRIAM Asia is the sole regional agent for the SCE RD Steel Alliance — European-grade structural steel, delivered directly to the region.",
    body: "Industrial buildings, process structures, custom fabrication and turnkey delivery — standalone steel structures, independent of any silo project.",
    image: "/images/steel-structure.jpg",
    imageAlt: "Standalone structural steel framework by the SCE-RD Steel Alliance",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open && "rotate-45",
      )}
      aria-hidden
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ArrowOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Gateways() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section id="gateways" className="scroll-mt-24 bg-cloud section-pad">
      <Container wide>
        {/* ---------- Desktop / tablet: horizontal accordion ---------- */}
        <div className="hidden gap-3 md:flex md:h-[465px]">
          {PANELS.map((p, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={p.n}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen ? "grow-[4.5]" : "grow-0",
                )}
                style={{ flexBasis: 160, minWidth: 160 }}
              >
                {/* Collapsed face */}
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  aria-label={`${p.n} — ${p.short}${isOpen ? "" : ", expand"}`}
                  className={cn(
                    "absolute inset-0 z-10 flex w-full cursor-pointer flex-col items-start justify-between bg-ink p-5 text-left transition-opacity duration-500",
                    isOpen && "pointer-events-none opacity-0",
                  )}
                >
                  <span>
                    <span className="font-display block text-2xl text-accent">{p.n}</span>
                    <span className="font-display mt-3 block w-[120px] text-[1.35rem] uppercase leading-[0.95] tracking-[-0.01em] text-white">
                      {p.short}
                    </span>
                  </span>
                  <PlusIcon open={false} />
                </button>

                {/* Expanded face */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                  aria-hidden={!isOpen}
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width:1280px) 60vw, 764px"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      !reduce && "group-hover:scale-[1.03]",
                    )}
                  />
                  <div className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/25" />

                  {/* Compact floating card — kept small so the photo breathes */}
                  <div className="absolute bottom-5 left-5 w-[min(380px,calc(100%-2.5rem))] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(33,46,54,0.6)]">
                    <div className="flex items-center justify-between gap-3">
                      {p.wordmark}
                      {/* Standard static button — no animation (boss note) */}
                      <a
                        href="#contact"
                        aria-label={`${p.heading} — get in touch`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-white hover:bg-accent-600"
                      >
                        <ArrowOut />
                      </a>
                    </div>
                    <h3 className="font-display mt-3 text-[1.55rem] uppercase leading-[0.95] tracking-[-0.01em] text-ink">
                      {p.heading}
                    </h3>
                    <p className="mt-2.5 text-[13px] font-medium leading-snug text-ink/85">{p.lead}</p>
                    <p className="mt-2 text-xs leading-[1.2] text-ink/60">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------- Mobile: vertical accordion ---------- */}
        <div className="flex flex-col gap-3 md:hidden">
          {PANELS.map((p, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={`m-${p.n}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 bg-ink p-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-xl text-accent">{p.n}</span>
                    <span className="font-display text-lg uppercase leading-none tracking-[-0.01em] text-white">
                      {p.short}
                    </span>
                  </span>
                  <PlusIcon open={isOpen} />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="relative">
                      <div className="relative h-64 w-full">
                        <Image src={p.image} alt={p.imageAlt} fill sizes="100vw" className="object-cover" />
                      </div>
                      <div className="bg-white p-5">
                        <div className="flex items-center justify-between gap-3">
                          {p.wordmark}
                          <a
                            href="#contact"
                            aria-label={`${p.heading} — get in touch`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-white hover:bg-accent-600"
                          >
                            <ArrowOut />
                          </a>
                        </div>
                        <h3 className="font-display mt-3 text-2xl uppercase leading-[0.95] tracking-[-0.01em] text-ink">
                          {p.heading}
                        </h3>
                        <p className="mt-2.5 text-sm font-medium leading-snug text-ink/85">{p.lead}</p>
                        <p className="mt-2 text-[13px] leading-[1.2] text-ink/60">{p.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
