import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { clinic } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-10 rounded-t-band bg-dark pt-20 pb-9 text-on-dark">
      <div className="wrap">
        <div className="border-dark-15 flex flex-wrap items-center justify-between gap-6 border-b pb-12">
          <h2 className="max-w-[620px] text-h2-xl">Let&apos;s get your family smiling.</h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink variant="accent" href="#visit">
              Book a visit
            </ButtonLink>
            <ButtonLink variant="outline-on-dark" href={clinic.whatsapp}>
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-8 pt-10 text-[15px] text-dim max-md:grid-cols-1">
          <div>
            <Logo tone="dark" />
            <p className="mt-3.5">Serving {clinic.serviceAreas}.</p>
          </div>
          <div>
            <b className="mb-2 block text-on-dark">Contact</b>
            {clinic.phone}
            <br />
            {clinic.email}
          </div>
          <div>
            <b className="mb-2 block text-on-dark">Follow</b>
            Instagram · Facebook
            <br />© 2026 {clinic.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
