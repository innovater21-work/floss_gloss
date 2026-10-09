"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button, ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { clinic } from "@/content/site";

const BookingWidgetContext = createContext<(() => void) | null>(null);

export function BookingWidgetProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) dialog.showModal();
    if (!isOpen && dialog?.open) dialog.close();
  }, [isOpen]);

  function openBooking() {
    setHasOpened(true);
    setIsOpen(true);
  }

  function closeBooking() {
    setIsOpen(false);
  }

  return (
    <BookingWidgetContext.Provider value={openBooking}>
      {children}
      {hasOpened ? (
        <dialog
          ref={dialogRef}
          aria-labelledby="kivi-booking-title"
          aria-describedby="kivi-booking-description"
          className="m-auto max-h-[94vh] w-[min(94vw,760px)] max-w-none overflow-hidden rounded-band border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-dark/70 max-md:rounded-card"
          onCancel={(event) => { event.preventDefault(); closeBooking(); }}
          onClick={(event) => { if (event.target === event.currentTarget) closeBooking(); }}
          onClose={closeBooking}
        >
          <div className="flex max-h-[94vh] flex-col">
            <header className="flex items-start justify-between gap-5 border-b border-line px-8 py-6 max-md:px-5 max-md:py-5">
              <div>
                <p className="mb-1 text-[12px] font-extrabold uppercase tracking-[.12em] text-accent">Online booking · KiviHealth</p>
                <h2 id="kivi-booking-title" className="font-display text-[28px] leading-tight max-md:text-[23px]">Continue to appointment booking</h2>
                <p id="kivi-booking-description" className="mt-1 max-w-[760px] text-[13px] text-muted">KiviHealth hosts the live appointment form. It will open in a new tab so you can choose an available slot and complete your booking there.</p>
              </div>
              <button
                type="button"
                autoFocus
                aria-label="Close appointment booking"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-[26px] leading-none text-ink hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-accent"
                onClick={closeBooking}
              >×</button>
            </header>
            <div className="grid gap-5 bg-bg-alt px-8 py-8 max-md:px-5 max-md:py-6">
              <p className="max-w-[760px] text-[14px] text-muted">Your booking details are entered on KiviHealth. If the provider has no suitable slots, you can return here and send the clinic an email request.</p>
              <div className="flex flex-wrap items-center gap-4">
                <ButtonLink variant="accent" href={clinic.kiviBookingUrl} target="_blank" rel="noopener noreferrer" onClick={closeBooking}>Continue to KiviHealth <span aria-hidden="true">↗</span></ButtonLink>
                <Link
                  className="font-extrabold text-primary underline underline-offset-2"
                  href={clinic.bookingUrl}
                  onClick={(event) => {
                    event.preventDefault();
                    closeBooking();
                    router.push(clinic.bookingUrl);
                  }}
                >Use the clinic request form</Link>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
    </BookingWidgetContext.Provider>
  );
}

export function BookAppointmentButton({
  children = "Book a visit",
  variant = "primary",
  size = "md",
  className,
  onActivate,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onActivate?: () => void;
}) {
  const openBooking = useContext(BookingWidgetContext);
  if (!openBooking) return <ButtonLink href={clinic.bookingUrl} variant={variant} size={size} className={className}>{children}</ButtonLink>;

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => { onActivate?.(); openBooking(); }}
    >
      {children}
    </Button>
  );
}
