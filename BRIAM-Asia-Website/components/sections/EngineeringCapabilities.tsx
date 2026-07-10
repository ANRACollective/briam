"use client";

import { Container } from "@/components/ui/Container";
import { FloatingSilo } from "@/components/ui/FloatingSilo";
import { Eyebrow } from "@/components/ui/Section";
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

export function EngineeringCapabilities() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="capabilities" className="relative scroll-mt-24 overflow-hidden bg-cloud py-20 md:py-28">
      {/* faint ductwork backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <Image src="/images/engineering-ductwork.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-cloud/40" />
      </div>

      {/* floating square silos drifting behind the timeline */}
      <FloatingSilo className="absolute top-28 -left-10 hidden w-48 opacity-[0.35] lg:block xl:left-6" floatDelay={0.4} />
      <FloatingSilo className="absolute bottom-24 -right-10 hidden w-52 opacity-30 lg:block xl:right-6" floatDelay={1.6} />

      <Container className="relative">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Eyebrow className="mb-5 justify-center">Engineering Capabilities</Eyebrow>
          <h2 className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-[0.85] tracking-[-0.02em] text-ink">
            End-to-end,
            <br />
            <span className="text-accent">from design to service</span>
          </h2>
        </div>

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* central spine: fills top→bottom on scroll, led by a glowing dot */}
          <div className="absolute left-4 top-0 h-full w-[3px] bg-ink/15 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-accent to-sce"
              style={reduce ? { height: "100%" } : { height: "100%", scaleY: lineScale }}
            />
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white shadow-[0_0_16px_6px_rgba(166,121,224,0.85)]"
                style={{ top: dotTop }}
              />
            )}
          </div>

          <ul className="space-y-10 md:space-y-14">
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.n} className="relative">
                  {/* node */}
                  <span className="absolute left-4 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span className="h-4 w-4 rounded-full border-2 border-accent bg-cloud" />
                    <motion.span
                      className="absolute h-4 w-4 rounded-full bg-accent/40"
                      initial={{ scale: 0 }}
                      whileInView={reduce ? undefined : { scale: [0, 1.8, 1], opacity: [0.6, 0, 0] }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 1.2 }}
                    />
                  </span>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: reduce ? 0 : 40,
                      x: reduce ? 0 : left ? -110 : 110,
                      scale: reduce ? 1 : 0.94,
                    }}
                    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto md:text-right" : "md:ml-auto"}`}
                  >
                    <div className="group rounded-lg border border-line/60 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-24px_rgba(119,61,189,0.55)]">
                      <span className="font-display block text-4xl leading-none tracking-[-0.02em] text-accent">
                        {step.n}
                      </span>
                      <h3 className="font-display mt-3 text-2xl leading-[0.9] tracking-[-0.01em] text-ink md:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
