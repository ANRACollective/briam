import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
