"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Photo frame. Shows a soft gradient + label until (or if) the image loads,
 * so layouts hold their shape before real photography is dropped in.
 */
export function Photo({
  src,
  alt,
  label,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority,
  className,
}: {
  src?: string;
  alt: string;
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[linear-gradient(135deg,var(--fg-soft),var(--fg-bg-alt))]",
        className,
      )}
    >
      <span className="absolute inset-0 z-0 grid place-items-center text-[12px] uppercase tracking-[.12em] text-muted">
        {label}
      </span>
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          className="z-[1] object-cover"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
