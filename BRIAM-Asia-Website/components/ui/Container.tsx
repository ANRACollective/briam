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
        // Fluid: spreads across the page with comfortable gutters, only capping
        // on ultra-wide screens so content stays edge-to-edge, not boxed in.
        "mx-auto w-full max-w-[2100px]",
        wide
          ? "px-6 md:px-10 lg:px-12 xl:px-16"
          : "px-6 md:px-10 lg:px-16 xl:px-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
