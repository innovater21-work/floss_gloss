import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "outline-on-dark";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center gap-[9px] whitespace-nowrap rounded-pill font-extrabold text-[15px] transition-all duration-200 hover:-translate-y-0.5";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary",
  accent: "bg-accent text-on-accent",
  outline: "border-2 border-primary text-primary",
  "outline-on-dark": "border-2 border-dark-35 text-on-dark",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-[26px] py-[15px]",
  sm: "px-[18px] py-[10px]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & { variant?: ButtonVariant; size?: ButtonSize };

/** Pill button rendered as a link — the only button shape in the system. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
