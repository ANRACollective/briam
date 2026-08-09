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
      width="18"
      height="18"
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
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* soft ambient depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-accent/12 blur-[150px]" />
      </div>

      <Container className="relative py-16 md:py-20">
        {/* Top: logo · nav · bulk-storage · group brands */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Logo */}
          <div className="shrink-0">
            <a href="#home" aria-label="BRIAM Asia, home" className="inline-block">
              <Image
                src="/images/logo-briam.png"
                alt="BRIAM"
                width={1200}
                height={382}
                priority
                className="h-14 w-auto md:h-[4.5rem]"
              />
            </a>
          </div>

          {/* Primary nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display w-fit text-xl uppercase leading-none tracking-[-0.01em] text-white/90 transition-colors duration-300 hover:text-accent md:text-2xl"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* The Bulk Storage Group */}
          <div className="max-w-xs">
            <h2 className="font-display text-[2rem] uppercase leading-[0.9] tracking-[-0.02em] md:text-[2.5rem]">
              The Bulk
              <br />
              Storage Group
            </h2>
            <address className="mt-5 text-base not-italic leading-[1.2] text-white/55">
              75 High Street,
              <br />
              Singapore 179435
            </address>
          </div>

          {/* Group brands */}
          <div className="flex w-full max-w-[240px] shrink-0 flex-col gap-4">
            {BRANDS.map((brand) => (
              <a
                key={brand.label}
                href={brand.href}
                className="group flex items-center justify-between gap-6"
              >
                <span className="font-display text-xl uppercase leading-none tracking-[-0.01em] text-white/90 transition-colors duration-300 group-hover:text-accent md:text-2xl">
                  {brand.label}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-accent text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-accent-600 group-hover:shadow-[0_8px_24px_-6px_rgba(119,61,189,0.8)]">
                  <OutArrow />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-6 text-sm text-white/55 md:mt-20 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Disclaimer
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Cookies Policy
            </a>
          </div>
          <p>© {new Date().getFullYear()} BRIAM. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
