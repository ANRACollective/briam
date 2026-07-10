"use client";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { IconAlliance, IconParts, IconProjects } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Section";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const CARDS = [
  {
    wordmark: "SCE",
    accent: "var(--color-sce)",
    Icon: IconProjects,
    image: "/images/steel-silo.jpg",
    title: "Tailor-made square silo projects",
    body: "SCE supplies high-performing, custom-made silo buildings for the biggest names in the feed and food-processing industry worldwide, delivering the highest level of project management and engineering on complex global projects.",
  },
  {
    wordmark: "SILBLOXX",
    accent: "var(--color-silbloxx)",
    Icon: IconParts,
    image: "/images/silbloxx-hands.jpg",
    title: "Silo-only product supplier",
    body: "Silbloxx serves machine builders, system integrators and the BRIAM Group with silo-only products through an online configurator — the most advanced silo-parts production in the world, made sustainably and cost-effectively.",
  },
  {
    wordmark: "BRIAM",
    accent: "var(--color-ink)",
    Icon: IconAlliance,
    image: "/images/steel-structure.jpg",
    title: "Your square silo partner",
    body: "Specialised in bulk storage and active all over the world. We bring multiple companies together, each with their own bulk-storage expertise, with one common goal: to create a waste-free world.",
  },
];

function ArrowOut() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Gateways() {
  const reduce = useReducedMotion();
  return (
    <section id="gateways" className="scroll-mt-24 bg-cloud py-24 md:py-36">
      <Container wide>
        <div className="mb-14 max-w-2xl md:mb-20">
          <Eyebrow className="mb-5">The BRIAM Group</Eyebrow>
          <h2 className="type-h2 text-ink">
            Three gateways,
            <span className="text-accent"> one square-silo alliance</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.wordmark}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -8 }}
              className="group flex flex-col overflow-hidden rounded-lg border border-line/60 bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(32,45,53,0.55)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                {/* floating label card */}
                <div
                  className="absolute right-4 top-4 flex w-[190px] flex-col gap-6 rounded-sm bg-white p-3 shadow-lg"
                  style={{ borderLeft: `3px solid ${card.accent}` }}
                >
                  <span
                    className="font-display text-xl tracking-[0.02em]"
                    style={{ color: card.accent === "var(--color-silbloxx)" ? "var(--color-ink)" : card.accent }}
                  >
                    {card.wordmark}
                  </span>
                  <div className="flex items-end justify-between gap-2">
                    <p className="font-display text-[1.35rem] uppercase leading-[0.95] tracking-[-0.01em] text-ink">
                      {card.title}
                    </p>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowOut />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <card.Icon className="h-9 w-9 text-accent" />
                <p className="mt-5 text-sm leading-relaxed text-ink/70">{card.body}</p>
                <div className="mt-7">
                  <ArrowLink href="#contact">Explore</ArrowLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
