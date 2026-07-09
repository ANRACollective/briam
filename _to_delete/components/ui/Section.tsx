import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

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
        // accent-700 keeps small text ≥ AA contrast on the light "cloud" bg
        tone === "accent" ? "text-accent-700" : "text-white/75",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-6", tone === "accent" ? "bg-accent" : "bg-white/60")}
      />
      {children}
    </span>
  );
}
