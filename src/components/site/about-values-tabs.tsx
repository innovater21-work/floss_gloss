"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Photo } from "@/components/ui/photo";

type ValueTab = { id: "vision" | "mission" | "quality"; title: string; text: string; image: { src: string; alt: string; label: string } };

export function AboutValuesTabs({ items }: { items: ValueTab[] }) {
  const [activeId, setActiveId] = useState<ValueTab["id"]>(items[0]?.id ?? "vision");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const active = items[activeIndex];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveId(items[nextIndex].id);
    buttons.current[nextIndex]?.focus();
  }

  if (!active) return null;

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="mb-7 flex flex-wrap justify-center gap-2 border-b border-line" role="tablist" aria-label="Clinic philosophy">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => { buttons.current[index] = element; }}
            id={`about-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={active.id === item.id}
            aria-controls={`about-panel-${item.id}`}
            tabIndex={active.id === item.id ? 0 : -1}
            className={`rounded-t-md px-5 py-3 text-[14px] font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active.id === item.id ? "bg-soft text-primary" : "text-muted hover:bg-bg-alt hover:text-ink"}`}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <section id={`about-panel-${active.id}`} role="tabpanel" aria-labelledby={`about-tab-${active.id}`} tabIndex={0} className="grid grid-cols-[.8fr_1.2fr] items-center gap-9 rounded-card border border-line bg-surface p-7 focus-visible:outline-2 focus-visible:outline-accent max-md:grid-cols-1 max-md:p-5">
        <Photo {...active.image} className="aspect-[4/3] rounded-lg" />
        <div>
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[.1em] text-accent">Floss &amp; Gloss Dental Clinic</p>
          <h3 className="mb-3 font-display text-[32px]">{active.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{active.text}</p>
        </div>
      </section>
    </div>
  );
}
