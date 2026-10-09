"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { clinic, treatments } from "@/content/site";
import { cn } from "@/lib/cn";

function LinkClass() {
  return "rounded-pill px-3 py-2 text-[14px] font-bold text-muted transition-colors hover:bg-bg-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
}

export function AnnouncementBar() {
  return (
    <div className="bg-accent px-4 py-2 text-center text-[13px] font-bold text-on-accent">
      <span>Sunday appointments by request · </span>
      <a className="underline decoration-white/50 underline-offset-2" href={clinic.phoneHref}>
        Call {clinic.phone}
      </a>
      <span className="mx-1">or</span>
      <a className="inline-flex items-center gap-1 underline decoration-white/50 underline-offset-2" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">
        <Icon name="wa" /> WhatsApp
      </a>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"about" | "treatments" | null>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const treatmentMenuRef = useRef<HTMLDivElement>(null);
  const aboutTriggerRef = useRef<HTMLButtonElement>(null);
  const treatmentTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };
  const toggleMenu = (menu: "about" | "treatments") => {
    setOpenMenu((current) => current === menu ? null : menu);
  };

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      const activeMenu = openMenu === "about" ? aboutMenuRef.current : treatmentMenuRef.current;
      const target = event.target;
      const isAnotherMenuTrigger = target instanceof Element && target.closest("[data-dropdown-trigger]");
      if (activeMenu && !activeMenu.contains(target as Node) && !isAnotherMenuTrigger) setOpenMenu(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const activeTrigger = openMenu === "about" ? aboutTriggerRef.current : treatmentTriggerRef.current;
      setOpenMenu(null);
      activeTrigger?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  const navClasses = mobileOpen
    ? "absolute top-full right-4 left-4 z-50 flex flex-col gap-1 rounded-xl border border-line bg-surface p-4 shadow-lg lg:static lg:ml-auto lg:flex-row lg:items-center lg:gap-1 lg:rounded-pill lg:p-1.5 lg:shadow-none"
    : "ml-auto hidden items-center gap-1 rounded-pill border border-line bg-surface p-1.5 lg:flex";

  return (
    <header className="relative z-40 border-b border-line/60 bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex min-h-[82px] items-center gap-4 max-md:min-h-[70px]">
        <Logo priority imageClassName="h-16 w-auto max-md:h-12" />
        <nav id="mobile-navigation" aria-label="Main navigation" className={navClasses}>
          <Link className={LinkClass()} href="/" onClick={closeMenu}>Home</Link>
          <div className="relative" ref={aboutMenuRef}>
            <button
              ref={aboutTriggerRef}
              type="button"
              data-dropdown-trigger
              className={cn(LinkClass(), "flex items-center gap-1 max-lg:w-full max-lg:justify-between", openMenu === "about" && "bg-bg-alt text-ink")}
              aria-expanded={openMenu === "about"}
              aria-controls="about-navigation"
              onClick={() => toggleMenu("about")}
            >
              About <Icon name="arrow" className={cn("size-3 transition-transform", openMenu === "about" ? "-rotate-90" : "rotate-90")} />
            </button>
            <div id="about-navigation" hidden={openMenu !== "about"} style={openMenu === "about" ? undefined : { display: "none" }} className="absolute top-full left-0 z-50 mt-2 grid w-64 gap-1 rounded-xl border border-line bg-surface p-2 shadow-lg max-lg:static max-lg:mt-0 max-lg:w-full max-lg:border-0 max-lg:pl-4 max-lg:shadow-none">
              <Link className={LinkClass()} href="/about" onClick={closeMenu}>Meet Dr. Archana</Link>
              <Link className={LinkClass()} href="/certificates" onClick={closeMenu}>Credentials</Link>
              <Link className={LinkClass()} href="/gallery" onClick={closeMenu}>Clinic gallery</Link>
            </div>
          </div>
          <div className="relative" ref={treatmentMenuRef}>
            <button
              ref={treatmentTriggerRef}
              type="button"
              data-dropdown-trigger
              className={cn(LinkClass(), "flex items-center gap-1 max-lg:w-full max-lg:justify-between", openMenu === "treatments" && "bg-bg-alt text-ink")}
              aria-expanded={openMenu === "treatments"}
              aria-controls="treatments-navigation"
              onClick={() => toggleMenu("treatments")}
            >
              Treatments <Icon name="arrow" className={cn("size-3 transition-transform", openMenu === "treatments" ? "-rotate-90" : "rotate-90")} />
            </button>
            <div id="treatments-navigation" hidden={openMenu !== "treatments"} style={openMenu === "treatments" ? undefined : { display: "none" }} className="absolute top-full left-0 z-50 mt-2 grid w-[min(560px,calc(100vw-2rem))] max-h-[72vh] grid-cols-2 gap-1 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-lg max-lg:static max-lg:mt-0 max-lg:max-h-64 max-lg:w-full max-lg:border-0 max-lg:pl-4 max-lg:shadow-none">
              <Link className={cn(LinkClass(), "col-span-2 bg-bg-alt text-ink")} href="/treatments" onClick={closeMenu}>All treatments</Link>
              {treatments.map((treatment) => (
                <Link className={LinkClass()} href={"/treatments/" + treatment.slug} key={treatment.slug} onClick={closeMenu}>
                  {treatment.name}
                </Link>
              ))}
            </div>
          </div>
          <Link className={LinkClass()} href="/faq" onClick={closeMenu}>FAQ</Link>
          <Link className={LinkClass()} href="/blog" onClick={closeMenu}>Journal</Link>
          <Link className={LinkClass()} href="/contact" onClick={closeMenu}>Contact</Link>
          <Link className={LinkClass()} href="/callback" onClick={closeMenu}>Callback</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <BookAppointmentButton size="sm" className="max-md:px-3 max-md:py-2 max-md:text-[13px]" onActivate={closeMenu}>
            Book a visit
          </BookAppointmentButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-primary lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="font-extrabold">{mobileOpen ? "×" : "Menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}


