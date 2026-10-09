"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type GalleryItem = { src: string; alt: string; label: string; objectPosition?: string };
type GalleryGroup = { title: string; description: string; photos: GalleryItem[] };
type ActivePhoto = { groupIndex: number; photoIndex: number; triggerIndex: number };

export function ImageGallery({
  items,
  groups,
  label,
}: {
  items?: GalleryItem[];
  groups?: GalleryGroup[];
  label: string;
}) {
  const isGrouped = groups !== undefined;
  const individualItems = items ?? [];
  const collections = groups ?? [];
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activePhoto !== null && dialog && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (activePhoto === null && dialog?.open) {
      dialog.close();
    }
  }, [activePhoto]);

  function close() {
    const triggerIndex = activePhoto?.triggerIndex;
    setActivePhoto(null);
    if (triggerIndex !== undefined) requestAnimationFrame(() => triggers.current[triggerIndex]?.focus());
  }

  function step(delta: number) {
    setActivePhoto((current) => {
      if (!current) return current;
      const photos = isGrouped ? collections[current.groupIndex]?.photos ?? [] : individualItems;
      if (photos.length < 2) return current;
      return { ...current, photoIndex: (current.photoIndex + delta + photos.length) % photos.length };
    });
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  function markFailed(src: string) {
    setFailedImages((current) => new Set(current).add(src));
  }

  const activeGroup = activePhoto && isGrouped ? collections[activePhoto.groupIndex] : null;
  const activePhotos = activePhoto
    ? isGrouped ? activeGroup?.photos ?? [] : individualItems
    : [];
  const activeItem = activePhoto ? activePhotos[activePhoto.photoIndex] ?? null : null;
  const activeTitle = activeGroup?.title ?? label;

  const cards = isGrouped
    ? collections.map((group, index) => ({
        item: group.photos[0]!,
        title: group.title,
        description: group.description,
        count: group.photos.length,
        triggerIndex: index,
        groupIndex: index,
        photoIndex: 0,
      }))
    : individualItems.map((item, index) => ({
        item,
        title: item.label,
        description: "",
        count: 1,
        triggerIndex: index,
        groupIndex: 0,
        photoIndex: index,
      }));

  return (
    <>
      <div
        className={`grid grid-cols-2 items-start gap-5 ${isGrouped ? "md:grid-cols-3" : "md:grid-cols-4"}`}
        role="group"
        aria-label={label}
      >
        {cards.map((card, index) => (
          <figure className="m-0" key={isGrouped ? card.title : card.item.src}>
            <button
              ref={(element) => { triggers.current[index] = element; }}
              type="button"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-bg-alt text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={isGrouped ? `Expand ${card.title} photo collection, ${card.count} ${card.count === 1 ? "photo" : "photos"}` : `Expand ${card.item.label} image to full size`}
              aria-haspopup="dialog"
              onClick={() => setActivePhoto({ groupIndex: card.groupIndex, photoIndex: card.photoIndex, triggerIndex: card.triggerIndex })}
            >
              {failedImages.has(card.item.src) ? (
                <span className="grid h-full place-items-center px-4 text-center text-[12px] uppercase tracking-[.1em] text-muted">{card.title}</span>
              ) : (
                <Image
                  src={card.item.src}
                  alt={card.item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  style={card.item.objectPosition ? { objectPosition: card.item.objectPosition } : undefined}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  onError={() => markFailed(card.item.src)}
                />
              )}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent px-3 pt-14 pb-3 text-white">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-primary shadow-md transition-transform group-hover:-translate-y-0.5 group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {isGrouped ? <span className="rounded-full bg-ink/75 px-3 py-2 text-[11px] font-bold backdrop-blur-sm">{card.count} {card.count === 1 ? "photo" : "photos"}</span> : null}
              </span>
            </button>
            <figcaption className="mt-3">
              <p className={`font-display leading-snug ${isGrouped ? "text-[18px]" : "text-[16px]"}`}>{card.title}</p>
              {isGrouped ? <p className="mt-1 text-[13px] text-muted">{card.description}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {activePhoto && activeItem ? (
        <dialog
          ref={dialogRef}
          aria-label={`${activeTitle}: ${activeItem.label}`}
          className="m-auto max-h-[94vh] w-[min(96vw,1120px)] max-w-none overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/80"
          onCancel={(event) => { event.preventDefault(); close(); }}
          onKeyDown={handleDialogKeyDown}
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}
          onClose={() => { if (activePhoto !== null) close(); }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
            <div className="min-w-0" aria-live="polite" aria-atomic="true">
              <p className="truncate font-display text-[19px]">{activeTitle}</p>
              <p className="truncate text-[13px] text-muted">{activeItem.label} · {activePhoto.photoIndex + 1} of {activePhotos.length}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-[25px] leading-none hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close enlarged photo"
              onClick={close}
            >×</button>
          </div>
          <div className="relative grid h-[min(76vh,800px)] min-h-[260px] place-items-center bg-surface p-3 sm:p-5">
            {failedImages.has(activeItem.src) ? (
              <span className="text-center text-[13px] uppercase tracking-[.1em] text-white">{activeItem.label}</span>
            ) : (
              <Image src={activeItem.src} alt={activeItem.alt} fill sizes="96vw" className="object-contain" onError={() => markFailed(activeItem.src)} />
            )}
            {activePhotos.length > 1 ? (
              <>
                <button type="button" className="absolute left-3 grid size-12 place-items-center rounded-full border border-white/25 bg-surface/95 text-[28px] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-accent sm:left-5" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
                <button type="button" className="absolute right-3 grid size-12 place-items-center rounded-full border border-white/25 bg-surface/95 text-[28px] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-accent sm:right-5" aria-label="Next photo" onClick={() => step(1)}>›</button>
              </>
            ) : null}
          </div>
          {activePhotos.length > 1 ? <p className="border-t border-line px-5 py-2 text-center text-[12px] text-muted">Use ← and → to browse this collection. Press Esc to close.</p> : null}
        </dialog>
      ) : null}
    </>
  );
}
