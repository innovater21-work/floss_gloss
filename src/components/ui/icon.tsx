import { cn } from "@/lib/cn";

/** All icon names available in the sprite. 24×24 grid, 1.8 stroke, round caps. */
export const iconNames = ["tooth", "tooth-spark", "spark", "crown", "smile", "align", "fill", "veneer", "pull", "gum", "implant", "denture", "wisdom", "root", "kid", "family", "care", "autoclave", "shield", "xray", "uv", "clock", "cal", "pin", "phone", "wa", "mail", "car", "card", "users", "heart", "grad", "badge", "check", "arrow", "arrow-l", "plus", "chat", "quote", "star"] as const;
export type IconName = (typeof iconNames)[number];

const SPRITE = `<symbol id="i-tooth-spark" viewBox="0 0 24 24"><path d="M7 6C4.6 6 3 8 3 10.4c0 2 .8 3.4 1.3 5.4.5 2 .7 5 1.7 7 .6 1.2 1.8 1.2 2.3 0 .6-1.6.8-4.1 2.7-4.1s2.1 2.5 2.7 4.1c.5 1.2 1.7 1.2 2.3 0 1-2 1.2-5 1.7-7 .5-2 1.3-3.4 1.3-5.4C21 8 19.4 6 17 6c-2 0-3 1-5 1S9 6 7 6z"/><path d="M18 2v3m-1.5-1.5h3M22 8v2m-1-1h2"/></symbol>
<symbol id="i-family" viewBox="0 0 24 24"><circle cx="12" cy="6.5" r="2.5"/><circle cx="5.5" cy="9" r="2"/><circle cx="18.5" cy="9" r="2"/><path d="M8 20v-1.5c0-2.8 1.5-4.7 4-4.7s4 1.9 4 4.7V20M1.8 19v-1.2c0-2.4 1.4-4 3.7-4 1.1 0 2 .3 2.7 1M22.2 19v-1.2c0-2.4-1.4-4-3.7-4-1.1 0-2 .3-2.7 1"/></symbol>
<symbol id="i-care" viewBox="0 0 24 24"><circle cx="8.5" cy="7" r="3"/><path d="M2.5 21c.4-4 2.5-6.5 6-6.5 2 0 3.5.7 4.6 2M17.5 13.5c-1.5-1.4-3.7-.3-3.7 1.4 0 1.2 1.9 2.3 3.7 3.7 1.8-1.4 3.7-2.5 3.7-3.7 0-1.7-2.2-2.8-3.7-1.4z"/></symbol>
<symbol id="i-autoclave" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="17" rx="2"/><path d="M8 5V3h8v2M8 8h2m4 0h2"/><circle cx="12" cy="15" r="4.5"/><path d="M12 12.5v2.8l1.8 1"/></symbol>
<symbol id="i-tooth" viewBox="0 0 24 24"><path d="M7 3C4.6 3 3 5 3 7.4c0 2 .8 3.4 1.3 5.4.5 2 .7 5 1.7 7 .6 1.2 1.8 1.2 2.3 0 .6-1.6.8-4.1 2.7-4.1s2.1 2.5 2.7 4.1c.5 1.2 1.7 1.2 2.3 0 1-2 1.2-5 1.7-7 .5-2 1.3-3.4 1.3-5.4C21 5 19.4 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></symbol>
<symbol id="i-crown" viewBox="0 0 24 24"><path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/><path d="M5 19h14"/></symbol>
<symbol id="i-smile" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.4 2.3 4 2.3s3-.8 4-2.3"/><path d="M9 9.5h.01M15 9.5h.01"/></symbol>
<symbol id="i-align" viewBox="0 0 24 24"><path d="M3 9c3-3 15-3 18 0v2c0 3-3 5-9 5s-9-2-9-5z"/><path d="M7 8.5v6M12 7.8V16M17 8.5v6"/></symbol>
<symbol id="i-fill" viewBox="0 0 24 24"><path d="M7 3C4.6 3 3 5 3 7.4c0 2 .8 3.4 1.3 5.4.5 2 .7 5 1.7 7 .6 1.2 1.8 1.2 2.3 0 .6-1.6.8-4.1 2.7-4.1s2.1 2.5 2.7 4.1c.5 1.2 1.7 1.2 2.3 0 1-2 1.2-5 1.7-7 .5-2 1.3-3.4 1.3-5.4C21 5 19.4 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/><circle cx="12" cy="9" r="2.2"/></symbol>
<symbol id="i-veneer" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="16" rx="3.5"/><rect x="13" y="4" width="7" height="16" rx="3.5"/></symbol>
<symbol id="i-pull" viewBox="0 0 24 24"><path d="M8 10C6.3 10 5 11.3 5 13c0 1.3.5 2.3.9 3.6.3 1.3.5 3.1 1.1 4.4.4.8 1.1.8 1.5 0 .4-1 .5-2.6 1.8-2.6s1.4 1.6 1.8 2.6c.3.8 1.1.8 1.5 0 .6-1.3.8-3.1 1.1-4.4.4-1.3.9-2.3.9-3.6 0-1.7-1.3-3-3-3-1.2 0-1.8.6-3 .6S9.2 10 8 10z"/><path d="M12 7V2M9.5 4.5L12 2l2.5 2.5"/></symbol>
<symbol id="i-gum" viewBox="0 0 24 24"><path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M6 9.5v6.5c0 1.5 1 2.5 2 2.5s2-1 2-2.5V11M14 11v5c0 1.5 1 2.5 2 2.5s2-1 2-2.5V9.5"/></symbol>
<symbol id="i-implant" viewBox="0 0 24 24"><path d="M8 3h8c1 0 2 1 2 2.5 0 2-1.5 3.5-6 3.5S6 7.5 6 5.5C6 4 7 3 8 3z"/><path d="M9 11h6M9.5 14h5M10 17h4M11 20h2"/></symbol>
<symbol id="i-denture" viewBox="0 0 24 24"><path d="M3 12c0-4 4-7 9-7s9 3 9 7"/><path d="M5 12v2a2 2 0 004 0v-2M9 12v2.5a2 2 0 004 0V12M13 12v2.5a2 2 0 004 0V12M17 12v2a2 2 0 002 2"/><path d="M3 12h18"/></symbol>
<symbol id="i-wisdom" viewBox="0 0 24 24"><path d="M7 3C4.6 3 3 5 3 7.4c0 2 .8 3.4 1.3 5.4.5 2 .7 5 1.7 7 .6 1.2 1.8 1.2 2.3 0 .6-1.6.8-4.1 2.7-4.1s2.1 2.5 2.7 4.1c.5 1.2 1.7 1.2 2.3 0 1-2 1.2-5 1.7-7 .5-2 1.3-3.4 1.3-5.4C21 5 19.4 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/><path d="M9 8l6 4M15 8l-6 4"/></symbol>
<symbol id="i-root" viewBox="0 0 24 24"><path d="M7 3C4.6 3 3 5 3 7.4c0 2 .8 3.4 1.3 5.4.5 2 .7 5 1.7 7 .6 1.2 1.8 1.2 2.3 0 .6-1.6.8-4.1 2.7-4.1s2.1 2.5 2.7 4.1c.5 1.2 1.7 1.2 2.3 0 1-2 1.2-5 1.7-7 .5-2 1.3-3.4 1.3-5.4C21 5 19.4 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/><path d="M10 9v7M14 9v7"/></symbol>
<symbol id="i-kid" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 21c.5-4 3.4-6 7-6s6.5 2 7 6"/><path d="M10.5 8.5h.01M13.5 8.5h.01"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></symbol>
<symbol id="i-xray" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M9 8.5c1 0 1.5.8 3 .8s2-.8 3-.8M9 11.5h6M10 14h4"/></symbol>
<symbol id="i-uv" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h3.5l1.8 4.5-2.3 1.4a11 11 0 006.1 6.1l1.4-2.3L20 14.5V18a2 2 0 01-2 2A15 15 0 013 5a2 2 0 012-2z"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1z"/><path d="M9 8.5c0 3 2.5 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 01-2.3-2.3l.8-1-1-2z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>
<symbol id="i-car" viewBox="0 0 24 24"><path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3z"/><circle cx="7.5" cy="13.5" r=".5"/><circle cx="16.5" cy="13.5" r=".5"/></symbol>
<symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.4-3.6 3-5.5 6.5-5.5s6.1 1.9 6.5 5.5"/><path d="M16 4.8a3.5 3.5 0 010 6.4M18 14.8c2 .6 3.3 2.3 3.5 5.2"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5C20 15.3 12 20 12 20z"/></symbol>
<symbol id="i-grad" viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/></symbol>
<symbol id="i-badge" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-arrow-l" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></symbol>
<symbol id="i-quote" viewBox="0 0 24 24"><path class="q" d="M4 18v-5.5C4 8 6.3 5.5 10 5v2.5c-2 .6-3 2-3 4h3V18zm10 0v-5.5C14 8 16.3 5.5 20 5v2.5c-2 .6-3 2-3 4h3V18z" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" fill="currentColor" stroke="none"/></symbol>
<symbol id="g-logo" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0124 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 01-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></symbol>`;

/** Render once (in the root layout). Icons reference these symbols via <use>. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: SPRITE }} />
  );
}

type IconProps = { name: IconName; className?: string; title?: string };

/** Line icon. Sizes to 1.15em by default and inherits currentColor. */
export function Icon({ name, className, title }: IconProps) {
  return (
    <svg
      className={cn(
        "inline-block size-[1.15em] flex-none fill-none stroke-current align-middle [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]",
        className,
      )}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Full-colour Google "G" mark. */
export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("size-7", className)} aria-label="Google" role="img">
      <use href="#g-logo" />
    </svg>
  );
}
