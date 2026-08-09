"use client";

import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const STEPS = [
  { n: "01", title: "Design & Engineering", body: "Structural design, load analysis, and full engineering documentation." },
  { n: "02", title: "Fabrication & Supply", body: "Steel silo components manufactured to specification via Silbloxx." },
  { n: "03", title: "On-Site Installation", body: "Full turnkey erection with site supervision and commissioning." },
  { n: "04", title: "Conveying Systems", body: "Integrated bulk material handling — augers, belts, pneumatic lines." },
  { n: "05", title: "Aeration & Drying", body: "Temperature control and ventilation systems for stored materials." },
  { n: "06", title: "Maintenance & Service", body: "Post-installation inspection, parts supply, and technical support." },
];

// Once-per-session staggered reveal. Figma layout (boss note): no icon, no
// "Step" word — just the big purple number, a larger Druk title, then body.
function StepCard({ step, i, reduce }: { step: (typeof STEPS)[number]; i: number; reduce: boolean }) {
  const left = i % 2 === 0;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <li className="relative">
      <span className="absolute left-4 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
        <span className="h-4 w-4 rounded-full border-2 border-accent bg-ink" />
        <motion.span
          className="absolute h-4 w-4 rounded-full bg-accent/40"
          initial={{ scale: 0 }}
          whileInView={reduce ? undefined : { scale: [0, 1.8, 1], opacity: [0.6, 0, 0] }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2 }}
        />
      </span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, delay: 0.05, ease }}
        className={`ml-14 text-left md:ml-0 md:w-[calc(50%-3rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}
      >
        <div className="group rounded-xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.09] hover:shadow-[0_24px_60px_-28px_rgba(119,61,189,0.7)] md:p-10">
          {/* number pops first… */}
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.12, type: "spring", stiffness: 260, damping: 18 }}
            className="font-display block text-[3.5rem] leading-none text-accent md:text-[4rem]"
          >
            {step.n}
          </motion.span>
          {/* …title + body follow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.28, ease }}
          >
            <h3 className="type-h3 mt-4 text-white">{step.title}</h3>
            <p className="mt-4 text-base leading-[1.2] text-white/70">{step.body}</p>
          </motion.div>
        </div>
      </motion.div>
    </li>
  );
}

export function EngineeringCapabilities() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // timeline fill
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // background sculpture twirl (whole-section scroll)
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Client note: as the user scrolls, the object turns mildly and grows.
  const bgRotate = useTransform(bgProgress, [0, 1], [-9, 9]);
  const bgScale = useTransform(bgProgress, [0, 0.5, 1], [1.15, 1.42, 1.62]);
  const bgY = useTransform(bgProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative scroll-mt-24 overflow-hidden bg-ink text-white section-pad"
    >
      {/* twirling BRIAM sculpture background (white render on black → blends into ink) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[110%] w-[145%] max-w-[1900px] -translate-x-1/2 -translate-y-1/2"
        style={reduce ? undefined : { rotate: bgRotate, scale: bgScale, y: bgY }}
      >
        <Image
          src="/images/sculpture.png"
          alt=""
          fill
          sizes="80vw"
          className="object-contain opacity-70 mix-blend-lighten"
        />
      </motion.div>
      {/* soft accent wash */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[160px]" />

      <Container className="relative z-10">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="type-h2 text-white">
            End-to-end,
            <br />
            <span className="text-accent">from design to service</span>
          </h2>
        </div>

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* central spine */}
          <div className="absolute left-4 top-0 h-full w-[3px] bg-white/15 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-accent to-sce"
              style={reduce ? { height: "100%" } : { height: "100%", scaleY: lineScale }}
            />
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white shadow-[0_0_16px_6px_rgba(119,61,189,0.85)]"
                style={{ top: dotTop }}
              />
            )}
          </div>

          <ul className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} step={step} i={i} reduce={!!reduce} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
