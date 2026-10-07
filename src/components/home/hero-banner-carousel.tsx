"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { HomepageSlide } from "@/content/site";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroBannerCarousel({ slides }: { slides: HomepageSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const prefersReducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);

  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [isHovered, isPlaying, prefersReducedMotion, slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[activeIndex];

  function showSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  return (
    <section className="wrap mt-12 max-md:mt-8" aria-label="Clinic highlights">
      <div
        className="relative isolate min-h-[270px] overflow-hidden rounded-band bg-dark text-on-dark max-md:min-h-[330px] max-md:rounded-card"
        role="region"
        aria-roledescription="carousel"
        aria-label="Clinic highlights"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsPlaying(false)}
      >
        {!failedImages.has(slide.image.src) ? (
          <Image src={slide.image.src} alt={slide.image.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" className="z-0 object-cover" onError={() => setFailedImages((current) => new Set(current).add(slide.image.src))} />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(11,20,64,.9),rgba(11,20,64,.65),rgba(11,20,64,.2))]" />
        <div className="relative z-20 flex min-h-[270px] flex-col justify-between gap-8 p-9 max-md:min-h-[330px] max-md:p-6">
          <div className="max-w-[650px]" aria-live="polite" aria-atomic="true">
            <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[.16em] text-accent-on-dark">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · Floss &amp; Gloss</p>
            <h2 className="font-display text-[clamp(30px,4.2vw,48px)] leading-[1.12]">{slide.title}</h2>
            <p className="mt-3 max-w-[550px] text-[16px] text-dim">{slide.text}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <ButtonLink variant="accent" size="sm" href="/contact">Contact us <Icon name="arrow" /></ButtonLink>
            <div className="flex items-center gap-2" aria-label="Carousel controls">
              <button type="button" className="grid size-10 place-items-center rounded-full border border-dark-35 text-[25px] hover:bg-dark-15 focus-visible:outline-2 focus-visible:outline-accent" aria-label="Previous highlight" onClick={() => showSlide(activeIndex - 1)}>‹</button>
              {slides.map((item, index) => (
                <button type="button" key={item.title} className={`size-2.5 rounded-full transition-transform focus-visible:outline-2 focus-visible:outline-accent ${index === activeIndex ? "scale-125 bg-accent" : "bg-on-dark/55 hover:bg-on-dark"}`} aria-label={`Show highlight ${index + 1}: ${item.title}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => showSlide(index)} />
              ))}
              <button type="button" className="grid size-10 place-items-center rounded-full border border-dark-35 text-[25px] hover:bg-dark-15 focus-visible:outline-2 focus-visible:outline-accent" aria-label="Next highlight" onClick={() => showSlide(activeIndex + 1)}>›</button>
              <button type="button" disabled={prefersReducedMotion} className="ml-1 grid size-10 place-items-center rounded-full border border-dark-35 text-[12px] font-extrabold hover:bg-dark-15 focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-55" aria-label={prefersReducedMotion ? "Automatic slides paused for reduced motion" : isPlaying ? "Pause automatic slides" : "Play automatic slides"} onClick={() => setIsPlaying((playing) => !playing)}>{isPlaying ? "Ⅱ" : "▶"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
