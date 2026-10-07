"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryItem = { src: string; alt: string; label: string };

export function ImageGallery({ items, label }: { items: GalleryItem[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (activeIndex === null && dialog?.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function close() {
    const previousIndex = activeIndex;
    setActiveIndex(null);
    if (previousIndex !== null) requestAnimationFrame(() => triggers.current[previousIndex]?.focus());
  }

  function markFailed(src: string) {
    setFailedImages((current) => new Set(current).add(src));
  }

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-4" role="group" aria-label={label}>
        {items.map((item, index) => (
          <figure className="m-0" key={item.src}>
            <button
              ref={(element) => { triggers.current[index] = element; }}
              type="button"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-bg-alt text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={`View ${item.label} full size`}
              aria-haspopup="dialog"
              onClick={() => setActiveIndex(index)}
            >
              {failedImages.has(item.src) ? (
                <span className="grid h-full place-items-center px-4 text-center text-[12px] uppercase tracking-[.1em] text-muted">{item.label}</span>
              ) : (
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" onError={() => markFailed(item.src)} />
              )}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pt-10 pb-3 text-[13px] font-extrabold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">View full size&nbsp; +</span>
            </button>
            <figcaption className="mt-3 font-display text-[18px]">{item.label}</figcaption>
          </figure>
        ))}
      </div>

      {activeItem ? (
        <dialog
          ref={dialogRef}
          aria-label={`${activeItem.label} photo`}
          className="m-auto max-h-[92vh] w-[min(94vw,1000px)] max-w-none overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/75"
          onCancel={(event) => { event.preventDefault(); close(); }}
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}
          onClose={() => { if (activeIndex !== null) close(); }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <p className="font-bold">{activeItem.label} <span className="text-muted">· {activeIndex! + 1} / {items.length}</span></p>
            <button ref={closeRef} type="button" className="grid size-11 place-items-center rounded-full border border-line text-[25px] leading-none hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-accent" aria-label="Close enlarged image" onClick={close}>×</button>
          </div>
          <div className="relative grid h-[min(75vh,760px)] min-h-[280px] place-items-center bg-bg-alt p-4">
            {failedImages.has(activeItem.src) ? (
              <span className="text-center text-[13px] uppercase tracking-[.1em] text-muted">{activeItem.label}</span>
            ) : (
              <Image src={activeItem.src} alt={activeItem.alt} fill sizes="94vw" className="object-contain" onError={() => markFailed(activeItem.src)} />
            )}
            <button type="button" className="absolute left-4 grid size-11 place-items-center rounded-full bg-surface/95 text-[28px] shadow-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent" aria-label="Previous image" onClick={() => setActiveIndex((index) => index === null ? 0 : (index - 1 + items.length) % items.length)}>‹</button>
            <button type="button" className="absolute right-4 grid size-11 place-items-center rounded-full bg-surface/95 text-[28px] shadow-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent" aria-label="Next image" onClick={() => setActiveIndex((index) => index === null ? 0 : (index + 1) % items.length)}>›</button>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
