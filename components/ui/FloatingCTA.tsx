"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Floating "Get in Touch" pill. Appears after the hero and hides once the
 * contact section is in view. Uses IntersectionObservers (no scroll-thrash).
 */
export function FloatingCTA() {
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contact = document.getElementById("contact");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting),
        { threshold: 0, rootMargin: "-40% 0px 0px 0px" },
      );
      o.observe(hero);
      observers.push(o);
    }
    if (contact) {
      const o = new IntersectionObserver(
        ([e]) => setAtContact(e.isIntersecting),
        { threshold: 0, rootMargin: "0px 0px -10% 0px" },
      );
      o.observe(contact);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !atContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -3 }}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_16px_40px_-10px_rgba(119,61,189,0.85)] md:bottom-6 md:right-6 md:px-6 md:py-3.5"
        >
          {!reduce && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
          )}
          Get in Touch
        </motion.a>
      )}
    </AnimatePresence>
  );
}
