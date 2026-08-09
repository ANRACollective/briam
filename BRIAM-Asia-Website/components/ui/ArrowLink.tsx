import { cn } from "@/lib/cn";

/**
 * Understated editorial CTA — text + a diagonal arrow that slides on hover.
 * Inspired by the reference sites' "Explore more →" links; premium and quiet
 * compared with a solid button.
 */
export function ArrowLink({
  href,
  children,
  className,
  tone = "accent",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "light" | "ink";
}) {
  const color =
    tone === "light"
      ? "text-white hover:text-accent"
      : tone === "ink"
        ? "text-ink hover:text-accent"
        : "text-accent hover:text-accent-700";
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        color,
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="relative block h-[18px] w-[18px] overflow-hidden">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        >
          <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
