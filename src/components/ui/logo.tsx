"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { logo } from "@/content/site";
import { Icon } from "./icon";

/**
 * The clinic logo (logo.png from floss-gloss.in — see `logo` in src/content/site.ts).
 * `tone="dark"` renders it as a white silhouette for the dark footer band.
 * If the file is missing it falls back to a text wordmark so the layout holds.
 */
export function Logo({
  tone = "light",
  className,
  imageClassName = "h-14 w-auto",
  priority,
}: {
  tone?: "light" | "dark";
  className?: string;
  /** Size the logo with height classes; width follows the aspect ratio. */
  imageClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Link href="/" className={cn("flex shrink-0 items-center", className)} aria-label="Floss & Gloss Dental Clinic — home">
      {failed ? (
        <span className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-[46px] place-items-center rounded-leaf",
              tone === "light" ? "bg-primary text-on-primary" : "bg-accent text-on-accent",
            )}
          >
            <Icon name="tooth" className="size-6" />
          </span>
          <b className={cn("font-display text-[22px] font-normal leading-none", tone === "dark" && "text-on-dark")}>
            Floss &amp; Gloss
          </b>
        </span>
      ) : (
        <Image
          src={logo.src}
          alt="Floss & Gloss Dental Clinic"
          width={logo.width}
          height={logo.height}
          preload={priority}
          className={cn(imageClassName, tone === "dark" && "brightness-0 invert")}
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  );
}


