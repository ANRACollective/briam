import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Wider measure for full-bleed-leaning galleries and grids. */
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        wide ? "max-w-[1600px]" : "max-w-[1280px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
