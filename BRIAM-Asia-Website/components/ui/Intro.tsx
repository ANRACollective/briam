"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Signature branded intro. CSS-driven (not JS/motion) so the logo and curtain
 * render and animate on the very first paint — without this, the heavy page JS
 * has to hydrate before the logo appears, leaving a blank dark hold then a late
 * pop. The React state only removes the element from the DOM once it's done.
 */
export function Intro() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="intro-curtain fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[130px]" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo image is the centered anchor; "Asia" is absolutely positioned so
            a late-loading font can't re-center the group and shift it. */}
        <div className="intro-logo relative flex -translate-x-[14px] items-end justify-center md:-translate-x-[18px]">
          <Image
            src="/images/logo-briam.png"
            alt="BRIAM Asia"
            width={180}
            height={57}
            priority
            className="h-10 w-auto md:h-14"
          />
          <span className="pointer-events-none absolute bottom-1 left-full ml-2 whitespace-nowrap text-xl font-medium text-white md:text-2xl">
            Asia
          </span>
        </div>

        <span className="intro-line mt-6 block h-[2px] w-40 origin-left bg-gradient-to-r from-accent to-sce" />
      </div>
    </div>
  );
}
