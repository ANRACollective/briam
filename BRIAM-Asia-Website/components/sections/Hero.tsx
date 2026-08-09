"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// Fixed lines to match the Figma break; lines stagger in ~100ms apart.
const HEADLINE = [
  "Square Silos.",
  "Structural Steel.",
  "Innovative Engineering.",
  "Delivered Across Asia Pacific",
];

const INTRO = 2.0; // hero content waits for the intro wipe

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content parallax; background keeps only the slow ken-burns zoom.
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Scroll indicator fades out as soon as the user starts scrolling past the hero.
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-ink pt-[72px]"
    >
      {/* Background: slow ken-burns zoom (once-per-load loop, alternating) */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/images/hero-worker.jpg"
            alt="BRIAM engineer in a hardhat working on steel silo components"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* scrim — keeps the left text legible while letting the image read clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <motion.div style={reduce ? undefined : { y: yContent, opacity }} className="relative w-full">
        <Container className="flex min-h-[calc(100svh-72px)] flex-col py-14 lg:py-20">
          <div className="max-w-[66rem]">
            <h1 className="font-display text-[clamp(2.9rem,6.2vw,4.6rem)] leading-[0.92] tracking-[-0.04em] text-white">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: (reduce ? 0 : INTRO + 0.05) + li * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : INTRO + 0.55 }}
              className="mt-7 max-w-lg text-lg text-white/85 md:text-xl"
            >
              The only regional agent for SCE RD Steel Alliance — standalone steel
              structures, no silo project required.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : INTRO + 0.65 }}
            className="mt-auto flex justify-end pt-16"
          >
            <div className="max-w-xl">
              {/* line-height inherited from the Figma type ramp tokens */}
              <p className="text-xl text-white/90 md:text-2xl">
                Part of BRIAM Group&apos;s international engineering network. Based
                in Singapore. Built for Southeast Asia.
              </p>
              <div className="mt-8">
                <Button href="#contact" variant="accent" className="px-6 py-3 text-base">
                  Get in Touch
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {!reduce && (
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="flex flex-col items-center gap-2 text-white/70"
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
        </motion.div>
      )}
    </section>
  );
}
