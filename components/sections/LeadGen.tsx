"use client";

import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LeadGen() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="scroll-mt-24 bg-cloud py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-lg bg-ink px-6 py-14 md:px-16">
          {/* animated sheen + glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]" />
            <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sce/15 blur-[120px]" />
            {!reduce && (
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                animate={{ x: ["-120%", "420%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
            )}
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] uppercase leading-[0.85] tracking-[-0.02em] text-white"
            >
              Get the full SCE RD Steel Alliance capability deck.
            </motion.h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Detailed capability overview, project references, and technical
              specifications — delivered to your inbox.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm text-ink/70 sm:w-[240px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 2h9l5 5v15H6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                SCE RD Technical.PDF
              </div>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 rounded-md bg-white px-4 py-3 text-ink outline-none ring-accent/40 transition-shadow placeholder:text-ink/40 focus:ring-4"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-[0_12px_40px_-8px_rgba(119,61,189,0.8)]"
              >
                <DownloadIcon />
                {sent ? "Sent ✓" : "Download"}
              </button>
            </form>
            {sent && (
              <motion.p
                role="status"
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-accent-400"
              >
                Thanks — the capability deck is on its way to {email}.
              </motion.p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
