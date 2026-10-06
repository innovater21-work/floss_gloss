import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Hand-lettered eyebrow above a heading ("For every age", "Meet your dentist"). */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mb-2.5 inline-block font-display text-[18px]",
        tone === "light" ? "text-accent" : "text-accent-on-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Centred section header: eyebrow + h2 + optional intro. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-14 max-w-[680px] text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h2">{title}</h2>
      {intro ? <p className="mt-3.5 text-muted">{intro}</p> : null}
      {children}
    </div>
  );
}

/** Five gold stars. */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("whitespace-nowrap tracking-[1px] text-star", className)} aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}
