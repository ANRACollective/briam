import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Even less side padding for full-bleed-leaning galleries. */
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        // Figma grid: 1280px content column, 80px gutters at 1440
        // (max-w 1360 − 2×40px padding = 1280 content; centering adds the rest).
        "mx-auto w-full max-w-[1360px] px-6 md:px-10",
        // `wide` kept for API compatibility — the Figma grid is uniform.
        wide && "",
        className,
      )}
    >
      {children}
    </div>
  );
}
