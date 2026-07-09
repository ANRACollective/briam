import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Section wrapper with the Figma section padding scale (48 / 80 / 112). */
export function Section({
  children,
  id,
  className,
  pad = "lg",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  pad?: "sm" | "md" | "lg";
}) {
  const padding =
    pad === "sm"
      ? "py-12 md:py-14"
      : pad === "md"
        ? "py-16 md:py-20"
        : "py-20 md:py-28";
  return (
    <section id={id} className={cn("scroll-mt-24", padding, className)}>
      {children}
    </section>
  );
}

/** Small uppercase eyebrow label used above section headings. */
export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
        tone === "accent" ? "text-accent" : "text-white/70",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "accent" ? "bg-accent" : "bg-white/50",
        )}
      />
      {children}
    </span>
  );
}
