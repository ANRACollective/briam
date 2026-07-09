"use client";

import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const COLUMNS = [
  {
    heading: "Solutions",
    links: [
      { label: "Standalone Steel Structures", href: "#solutions" },
      { label: "Engineering Capabilities", href: "#capabilities" },
      { label: "SCE RD Steel Alliance", href: "#gateways" },
      { label: "Featured Projects", href: "#projects" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Regional Presence", href: "#regional" },
      { label: "Markets Served", href: "#markets" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Group Brands",
    links: [
      { label: "SCE", href: "#gateways" },
      { label: "Silbloxx", href: "#gateways" },
      { label: "BRIAM Group", href: "#gateways" },
    ],
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative inline-block py-1 text-white/70 transition-colors hover:text-white">
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer() {
  const reduce = useReducedMotion();
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-[130px]" />
      </div>

      <Container className="relative py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/images/logo-briam.png" alt="BRIAM" width={120} height={38} className="h-8 w-auto" />
              <span className="text-lg font-medium">Asia</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Singapore&apos;s gateway to BRIAM Group&apos;s global engineering
              capabilities and the exclusive regional agent for the SCE RD Steel
              Alliance.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-[0_12px_40px_-8px_rgba(119,61,189,0.8)]"
            >
              Get in Touch
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} className="text-sm" aria-label={col.heading}>
              <h4 className="font-display mb-4 text-lg uppercase tracking-[-0.01em] text-white">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BRIAM Asia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <button
              onClick={toTop}
              className="group flex items-center gap-2 transition-colors hover:text-white"
              aria-label="Back to top"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-accent-400 group-hover:bg-accent-400/10">
                <motion.svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  animate={reduce ? undefined : { y: [0, -3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
