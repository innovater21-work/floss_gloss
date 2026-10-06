import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

/**
 * Rounded info pill with an optional accent icon.
 * size "md" = hero trust badges (8×16, 14px) · "sm" = credential chips (8×14, 14px)
 * · "xs" = tag chips inside cards (5×11, 13px, no icon).
 */
export function Pill({
  icon,
  children,
  size = "md",
  className,
}: {
  icon?: IconName;
  children: ReactNode;
  size?: "md" | "sm" | "xs";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-line bg-surface font-bold",
        size === "md" && "gap-2 px-4 py-2 text-[14px]",
        size === "sm" && "gap-[7px] px-3.5 py-2 text-[14px]",
        size === "xs" && "px-[11px] py-[5px] text-[13px]",
        className,
      )}
    >
      {icon ? <Icon name={icon} className="text-accent" /> : null}
      {children}
    </span>
  );
}
