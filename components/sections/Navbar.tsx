"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions", children: [
    { label: "Standalone Steel Structures", href: "#solutions" },
    { label: "Engineering Capabilities", href: "#capabilities" },
    { label: "SCE RD Steel Alliance", href: "#gateways" },
  ] },
  { label: "Regional Presence", href: "#regional" },
  { label: "Contact", href: "#contact" },
];

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={reduce ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cloud/85 backdrop-blur-md shadow-[0_1px_0_rgba(32,45,53,0.08),0_8px_30px_-12px_rgba(32,45,53,0.25)]"
          : "bg-cloud/95",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[1280px] items-center gap-8 px-6 md:px-10 lg:px-16 transition-all duration-300",
          scrolled ? "h-[60px]" : "h-[72px]",
        )}
        aria-label="Primary"
      >
        {/* Logo */}
        <a href="#home" className="flex flex-1 items-center gap-2" aria-label="BRIAM Asia home">
          <Image src="/images/logo-briam-dark.png" alt="BRIAM" width={120} height={38} priority className="h-8 w-auto" />
          <span className="text-lg font-medium text-ink">Asia</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="group relative">
              <a
                href={link.href}
                className="flex items-center gap-1 text-[17px] font-medium text-ink transition-colors hover:text-accent"
              >
                {link.label}
                {link.children && <Chevron className="transition-transform duration-300 group-hover:rotate-180" />}
              </a>
              {link.children && (
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[240px] overflow-hidden rounded-lg border border-line/70 bg-white p-1.5 shadow-xl">
                    {link.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block rounded-md px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-cloud hover:text-accent"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden items-center gap-5 border-l border-line pl-5 lg:flex">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-ink transition-colors hover:text-accent"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
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
                  className="absolute right-0 top-full mt-2 min-w-[100px] overflow-hidden rounded-md border border-line/70 bg-white p-1 shadow-xl"
                  role="listbox"
                >
                  {["EN", "中文", "BM"].map((l) => (
                    <li key={l}>
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
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-[15px] text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-[0_12px_40px_-8px_rgba(119,61,189,0.75)]"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[60px] z-40 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-6 py-8"
            >
              {NAV_LINKS.flatMap((l) => [l, ...(l.children ?? [])]).map((link) => (
                <motion.li
                  key={link.label}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                >
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
