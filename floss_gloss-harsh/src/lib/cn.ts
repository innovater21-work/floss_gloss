import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h2", "h2-lg", "h2-xl", "h2-sm"],
      radius: ["pill", "sm", "md", "lg", "card", "xl", "band", "arch", "arch-lg", "leaf"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
