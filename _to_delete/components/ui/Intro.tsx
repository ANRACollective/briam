"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Signature branded intro. Covers the viewport on first paint (so there's no
 * flash), reveals the BRIAM mark, then lifts away to show the hero.
 * Under reduced-motion it does a quick, calm fade instead of the reveal.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Lock scroll while the curtain is up
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), reduce ? 500 : 1900);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.4 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ambient glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[130px]" />
          </div>

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end gap-2"
            >
              <Image
                src="/images/logo-briam.png"
                alt="BRIAM Asia"
                width={180}
                height={57}
                priority
                className="h-10 w-auto md:h-14"
              />
              <span className="pb-1 text-xl font-medium text-white md:text-2xl">Asia</span>
            </motion.div>

            {/* accent line draw */}
            {!reduce && (
              <motion.span
                className="mt-6 block h-[2px] w-40 origin-left bg-gradient-to-r from-accent via-accent-400 to-sce"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
