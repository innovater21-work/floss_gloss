"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/photo";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";

type CarouselItem = { src: string; alt: string; label: string };

export function InfrastructureCarousel({ items }: { items: CarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (items.length === 0) return null;
  const current = items[activeIndex];

  function step(delta: number) {
    setActiveIndex((index) => (index + delta + items.length) % items.length);
  }

  return (
    <section className="section-y bg-bg-alt">
      <div className="wrap">
        <SectionHeader eyebrow="A look around" title="The clinic, up close" intro="Take a look around Floss & Gloss before you plan your visit." />
        <div className="mx-auto max-w-[1000px]">
          <div className="relative" role="region" aria-roledescription="carousel" aria-label="Clinic infrastructure photos" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") step(-1); if (event.key === "ArrowRight") step(1); }}>
            <div className="overflow-hidden rounded-band border border-line bg-surface p-3 max-md:rounded-card max-md:p-2" aria-live="polite" aria-atomic="true">
              <Photo {...current} sizes="(max-width: 1000px) 100vw, 960px" className="aspect-[16/8] rounded-[22px] max-md:aspect-[4/3]" />
              <div className="flex items-center justify-between gap-4 px-3 pt-4 pb-2 max-md:px-1">
                <p className="font-display text-[20px]">{current.label}</p>
                <span className="text-[13px] font-bold text-muted">{activeIndex + 1} / {items.length}</span>
              </div>
            </div>
            <button type="button" className="absolute top-1/2 left-7 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-[28px] shadow-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent max-md:left-4" aria-label="Previous clinic photo" onClick={() => step(-1)}>‹</button>
            <button type="button" className="absolute top-1/2 right-7 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-[28px] shadow-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent max-md:right-4" aria-label="Next clinic photo" onClick={() => step(1)}>›</button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label="Choose clinic photo">
            {items.map((item, index) => (
              <button key={item.src} type="button" className={`size-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${index === activeIndex ? "bg-primary" : "bg-line hover:bg-muted"}`} aria-label={`Show clinic photo ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => setActiveIndex(index)} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <ButtonLink variant="outline" href="/gallery">View infrastructure <Icon name="arrow" /></ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
