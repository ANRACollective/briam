"use client";

import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// Two fixed lines to match the Figma break.
const HEADLINE = [
  ["STRUCTURAL", "STEEL."],
  ["DELIVERED", "ACROSS", "SEA."],
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content parallax only — the background image stays static.
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-[72px]"
    >
      {/* Background: static image (no parallax) */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/hero-steel.jpg"
          alt="Engineer standing beneath a large radial steel silo structure"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* lighter scrim — keeps the left text legible while letting the image read clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <motion.div style={reduce ? undefined : { y: yContent, opacity }} className="relative w-full">
        <Container className="py-24 lg:py-28">
          <div className="max-w-[66rem]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 2.0 }}
              className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/75"
            >
              <span className="h-px w-8 bg-accent-400" /> BRIAM Asia · Singapore
            </motion.p>

            <h1 className="font-display text-[clamp(3.25rem,8vw,6rem)] leading-[0.85] tracking-[-0.045em] text-white">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => {
                    const idx =
                      HEADLINE.slice(0, li).reduce((n, l) => n + l.length, 0) + wi;
                    return (
                      <span key={wi} className="mr-[0.16em] inline-block overflow-hidden align-top">
                        <motion.span
                          className="inline-block"
                          initial={reduce ? false : { y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.7, delay: (reduce ? 0 : 2.05) + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 2.5 }}
              className="mt-7 max-w-lg text-lg text-white/85 md:text-xl"
            >
              The only regional agent for SCE RD Steel Alliance — standalone steel
              structures, no silo project required.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 2.6 }}
            className="mt-12 flex lg:mt-16 lg:justify-end"
          >
            <div className="max-w-md">
              <p className="text-lg text-white/85 md:text-xl">
                BRIAM Asia is Singapore&apos;s gateway to BRIAM Group&apos;s global
                engineering capabilities, including exclusive regional access to the
                SCE RD Steel Alliance.
              </p>
              <div className="mt-8">
                <MagneticButton href="#contact" variant="accent" className="px-7 py-3.5 text-base">
                  Get in Touch
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/40">
            <motion.span
              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      )}
    </section>
  );
}
