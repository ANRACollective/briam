"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "home", "solutions", "capabilities", "gateways",
  "stats", "regional", "markets", "projects", "contact",
];

const NAV_LINKS = [
  {
    label: "Solutions",
    href: "#solutions",
    match: ["solutions", "capabilities", "gateways", "stats"],
    children: [
      { label: "Standalone Steel Structures", href: "#solutions" },
      { label: "Engineering Capabilities", href: "#capabilities" },
      { label: "SCE RD Steel Alliance", href: "#gateways" },
    ],
  },
  { label: "Regional Presence", href: "#regional", match: ["regional", "markets"] },
  { label: "Contact", href: "#contact", match: ["contact"] },
];

const LANGS = ["EN", "中文", "BM"];

function Globe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function Chevron({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  const solutionsRef = useRef<HTMLLIElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close popovers on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) setSolutionsOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSolutionsOpen(false); setLangOpen(false); }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Mobile drawer: lock scroll, focus trap, Escape, restore focus
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>('a[href], button');
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (match?: string[]) => (match ? match.includes(active) : false);
  const headerH = scrolled ? 60 : 72;

  return (
    <motion.header
      initial={reduce ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 1.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cloud/85 backdrop-blur-md shadow-[0_1px_0_rgba(32,45,53,0.08),0_8px_30px_-12px_rgba(32,45,53,0.25)]"
          : "bg-cloud/95",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[2100px] items-center gap-8 px-6 transition-all duration-300 md:px-10 lg:px-16 xl:px-24",
          scrolled ? "h-[60px]" : "h-[72px]",
        )}
        aria-label="Primary"
      >
        <a href="#home" className="flex flex-1 items-center gap-2" aria-label="BRIAM Asia, home">
          <Image src="/images/logo-briam-dark.png" alt="BRIAM" width={1200} height={382} priority className="h-8 w-auto" />
          <span className="text-lg font-medium text-ink">Asia</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const activeLink = isActive(link.match);
            if (!link.children) {
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={activeLink ? "true" : undefined}
                    className={cn(
                      "relative text-[17px] font-medium transition-colors hover:text-accent",
                      activeLink ? "text-accent" : "text-ink",
                    )}
                  >
                    {link.label}
                    <span className={cn("absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300", activeLink ? "w-full" : "w-0")} />
                  </a>
                </li>
              );
            }
            return (
              <li
                key={link.label}
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                  aria-controls="solutions-menu"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  className={cn(
                    "relative flex items-center gap-1 text-[17px] font-medium transition-colors hover:text-accent",
                    activeLink ? "text-accent" : "text-ink",
                  )}
                >
                  {link.label}
                  <Chevron className={cn("transition-transform duration-300", solutionsOpen && "rotate-180")} />
                  <span className={cn("absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300", activeLink ? "w-[calc(100%-22px)]" : "w-0")} />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      id="solutions-menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="min-w-[240px] overflow-hidden rounded-lg border border-line/70 bg-white p-1.5 shadow-xl">
                        {link.children.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="block rounded-md px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-cloud hover:text-accent"
                          >
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="hidden items-center gap-5 border-l border-line pl-5 lg:flex">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-ink transition-colors hover:text-accent"
              aria-expanded={langOpen}
              aria-haspopup="true"
              aria-label={`Language: ${lang}. Change language`}
            >
              <Globe /> {lang} <Chevron className={cn("h-4 w-4 transition-transform", langOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 min-w-[110px] overflow-hidden rounded-md border border-line/70 bg-white p-1 shadow-xl"
                  role="listbox"
                  aria-label="Language"
                >
                  {LANGS.map((l) => (
                    <li key={l} role="option" aria-selected={lang === l}>
                      <button
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={cn(
                          "block w-full rounded px-3 py-1.5 text-left text-sm transition-colors hover:bg-cloud",
                          lang === l ? "text-accent" : "text-ink/80",
                        )}
                      >
                        {l}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <MagneticButton href="#contact" variant="accent" className="px-5 py-3">
            Get in Touch
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          <div className="relative h-4 w-6">
            <span className={cn("absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-6 bg-ink transition-all duration-300", open && "opacity-0")} />
            <span className={cn("absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ top: headerH }}
            className="fixed inset-x-0 bottom-0 z-40 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-6 py-8"
            >
              {NAV_LINKS.flatMap((l) => [l, ...(l.children ?? [])]).map((link) => (
                <motion.li key={link.label} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 text-2xl font-medium text-white transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="mt-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-md bg-accent px-6 py-4 text-lg text-white"
                >
                  Get in Touch
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
