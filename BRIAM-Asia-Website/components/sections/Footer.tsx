"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";

/** Primary footer navigation (Druk display links). */
const NAV = [
  { label: "Silo-Based Projects", href: "#solutions" },
  { label: "Steel Structures", href: "#gateways" },
  { label: "Regional Presence", href: "#regional" },
  { label: "Contact", href: "#contact" },
];

/** Group brands — external gateways, shown with an out-link tile. */
const BRANDS = [
  { label: "SCE", href: "#gateways" },
  { label: "Silbloxx", href: "#gateways" },
  { label: "BRIAM Group", href: "#gateways" },
];

/** Diagonal out-link arrow used inside the brand tiles. */
function OutArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M7 17 17 7M8.5 7H17V15.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Utility zone: no entrance animation (boss sticky), hover transitions only.
// Layout matched 1:1 to the Figma footer frame: oversized B-mark bleeding off
// the left viewport edge, text wordmark, flat ink background (no glow),
// underlined legal links.
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* BRIAM symbol bleeding off the left edge — Figma: ~136px tall, only
          slightly cropped (~12%), sitting just above the wordmark row */}
      <Image
        src="/images/logo-briam-mark.png"
        alt=""
        aria-hidden
        width={254}
        height={382}
        className="pointer-events-none absolute left-0 top-12 hidden h-[8.5rem] w-auto -translate-x-[12%] md:block"
      />

      <Container className="relative pb-10 pt-16 md:pb-12 md:pt-[4.5rem]">
        {/* Top: wordmark · nav · bulk-storage · group brands */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Wordmark (text only — the symbol lives on the edge).
              Figma indents it ~62px inside the content grid to clear the mark. */}
          <div className="shrink-0 lg:pl-16">
            <a href="#home" aria-label="BRIAM Asia, home" className="inline-block">
              <Image
                src="/images/logo-briam-wordmark.png"
                alt="BRIAM"
                width={768}
                height={260}
                priority
                className="h-12 w-auto md:h-14"
              />
            </a>
          </div>

          {/* Primary nav */}
          <nav aria-label="Footer" className="flex flex-col gap-5">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display w-fit text-xl uppercase leading-none tracking-[-0.01em] text-white/90 transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* The Bulk Storage Group */}
          <div className="max-w-xs">
            <h2 className="font-display text-[2.5rem] uppercase leading-[0.9] tracking-[-0.02em]">
              The Bulk
              <br />
              Storage Group
            </h2>
            <address className="mt-4 text-base not-italic leading-[1.35] text-white/60">
              75 High Street,
              <br />
              Singapore 179435
            </address>
          </div>

          {/* Group brands */}
          <div className="flex w-full max-w-[240px] shrink-0 flex-col gap-7">
            {BRANDS.map((brand) => (
              <a
                key={brand.label}
                href={brand.href}
                className="group flex items-center justify-between gap-6"
              >
                <span className="font-display text-xl uppercase leading-none tracking-[-0.01em] text-white/90 transition-colors duration-300 group-hover:text-accent">
                  {brand.label}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-white transition-colors duration-300 group-hover:bg-accent-600">
                  <OutArrow />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 text-sm text-white/60 md:mt-20 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href="#" className="underline underline-offset-2 transition-colors duration-300 hover:text-white">
              Disclaimer
            </a>
            <a href="#" className="underline underline-offset-2 transition-colors duration-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="underline underline-offset-2 transition-colors duration-300 hover:text-white">
              Cookies Policy
            </a>
          </div>
          <p>© {new Date().getFullYear()} BRIAM. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
