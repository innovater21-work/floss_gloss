import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { clinic, nav } from "@/content/site";

export function AnnouncementBar() {
  return (
    <div className="bg-accent px-4 py-[9px] text-center text-[14px] font-bold text-on-accent">
      Sunday appointments available · Call or WhatsApp {clinic.phone}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header>
      <div className="wrap flex h-[88px] items-center gap-7 max-md:h-[72px]">
        <Logo priority imageClassName="h-14 w-auto max-md:h-11" />
        <nav className="ml-auto flex gap-1.5 rounded-pill border border-line bg-surface p-1.5 max-lg:hidden">
          {nav.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={i === 0 ? "page" : undefined}
              className="rounded-pill px-4 py-[9px] text-[15px] font-bold text-muted hover:bg-bg-alt hover:text-ink aria-[current=page]:bg-bg-alt aria-[current=page]:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink href="#visit" className="max-lg:ml-auto max-md:px-4 max-md:py-[11px] max-md:text-[13px]">
          Book a visit
        </ButtonLink>
      </div>
    </header>
  );
}
