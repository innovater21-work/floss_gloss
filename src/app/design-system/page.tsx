import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/button";
import { GoogleLogo, Icon, iconNames } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { Photo } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { Eyebrow, SectionHeader, Stars } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Design system - Floss & Gloss",
  robots: { index: false },
};

const colors = [
  ["primary", "--fg-primary", "#332C84", "Indigo - main actions, logo mark"],
  ["accent", "--fg-accent", "#068CA0", "Teal - highlights, eyebrows, secondary CTA"],
  ["soft", "--fg-soft", "#E3F3F6", "Teal wash - tinted cards, open FAQ"],
  ["bg", "--fg-bg", "#FFFFFF", "Page background"],
  ["bg-alt", "--fg-bg-alt", "#F3F5FB", "Banded sections, hover"],
  ["surface", "--fg-surface", "#FFFFFF", "Cards"],
  ["line", "--fg-line", "#E2E6F0", "Borders, dashed dividers"],
  ["ink", "--fg-ink", "#0E1533", "Text"],
  ["muted", "--fg-muted", "#5B637A", "Supporting text"],
  ["dark", "--fg-dark", "#0B1440", "Calm band, footer"],
  ["dim", "--fg-dim", "#AEB6D3", "Secondary text on dark"],
  ["star", "--fg-star", "#F5B301", "Rating stars"],
];

const radii = [
  ["pill", "99px"],
  ["sm", "20px"],
  ["md", "22px"],
  ["lg", "24px"],
  ["card", "28px"],
  ["xl", "32px"],
  ["band", "40px"],
  ["arch", "999 999 28 28"],
  ["leaf", "50% 50% 50% 14px"],
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="mb-8 text-h2-sm">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="wrap py-16">
      <Eyebrow>Warm Family · Brand palette</Eyebrow>
      <h1 className="text-display">Floss &amp; Gloss design system</h1>
      <p className="mt-6 max-w-[620px] text-[19px] text-muted">
        Tokens live in <code>src/styles/tokens.css</code> and are exposed to Tailwind in{" "}
        <code>src/app/globals.css</code>. Components live in <code>src/components/ui</code>.
      </p>

      <Block title="Colour">
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {colors.map(([name, token, hex, use]) => (
            <div key={name} className="overflow-hidden rounded-lg border border-line bg-surface">
              <div className="h-24 border-b border-line" style={{ background: `var(${token})` }} />
              <div className="p-4 text-[14px]">
                <b className="block text-[15px]">{name}</b>
                <span className="text-muted">
                  {hex} · <code>{token}</code>
                </span>
                <p className="mt-1 text-muted">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography">
        <div className="grid gap-6">
          <div>
            <small className="text-[13px] font-bold text-muted">text-display · Young Serif · clamp(42–84px)</small>
            <p className="font-display text-display leading-[1.12]">Feels like family</p>
          </div>
          <div>
            <small className="text-[13px] font-bold text-muted">text-h2 · clamp(32–50px)</small>
            <h2 className="text-h2">One dentist for the whole family</h2>
          </div>
          <div>
            <small className="text-[13px] font-bold text-muted">h3 · 26px</small>
            <h3 className="text-[26px]">Little ones</h3>
          </div>
          <div>
            <small className="text-[13px] font-bold text-muted">Eyebrow · Young Serif 18px accent</small>
            <div>
              <Eyebrow>For every age</Eyebrow>
            </div>
          </div>
          <div>
            <small className="text-[13px] font-bold text-muted">Body · Nunito Sans 17/1.6 · lead 19px · small 15px</small>
            <p className="max-w-[620px]">
              Gentle, unhurried dentistry for every age - with a doctor who explains everything.
            </p>
            <p className="max-w-[620px] text-[15px] text-muted">Gentle first visits help children build healthy habits early.</p>
          </div>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="#">
            <Icon name="cal" />
            Primary
          </ButtonLink>
          <ButtonLink variant="accent" href="#">
            Accent <Icon name="arrow" />
          </ButtonLink>
          <ButtonLink variant="outline" href="#">
            <Icon name="wa" />
            Outline
          </ButtonLink>
          <ButtonLink variant="outline" size="sm" href="#">
            Small outline
          </ButtonLink>
          <Button>Button element</Button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 rounded-xl bg-dark p-8">
          <ButtonLink variant="accent" href="#">
            Accent on dark
          </ButtonLink>
          <ButtonLink variant="outline-on-dark" href="#">
            Outline on dark
          </ButtonLink>
        </div>
      </Block>

      <Block title="Pills & chips">
        <div className="flex flex-wrap items-center gap-2.5">
          <Pill icon="star">5.0 on Google</Pill>
          <Pill size="sm" icon="grad">MDS Periodontics</Pill>
          <Pill size="xs">Paediatric care</Pill>
          <i className="rounded-pill bg-soft px-2.5 py-1 text-[12px] font-extrabold text-accent not-italic">3</i>
          <Stars />
          <GoogleLogo />
        </div>
      </Block>

      <Block title="Radii">
        <div className="flex flex-wrap gap-5">
          {radii.map(([name, v]) => (
            <div key={name} className="text-center text-[13px]">
              <div
                className="mb-2 size-24 border-2 border-accent bg-soft"
                style={{ borderRadius: `var(--fg-radius-${name})` }}
              />
              <b>{name}</b>
              <div className="text-muted">{v}</div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Signature shapes">
        <div className="grid grid-cols-3 items-end gap-[22px] max-md:grid-cols-1">
          <Photo label="Arch photo" alt="" className="aspect-[3/4] rounded-arch" />
          <div className="flex flex-col items-start gap-5">
            <Logo />
            <div className="rounded-xl bg-dark p-6">
              <Logo tone="dark" />
            </div>
          </div>
          <div className="grid size-32 rotate-[-10deg] place-items-center rounded-full bg-accent text-center text-[13px] leading-[1.25] font-extrabold text-on-accent shadow-sticker">
            <div>
              <b className="block font-display text-[34px] leading-none font-normal">5.0★</b>
              Sticker
            </div>
          </div>
        </div>
      </Block>

      <Block title="Icons">
        <div className="grid grid-cols-6 gap-3 max-md:grid-cols-3">
          {iconNames.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2 rounded-md border border-line p-4 text-[13px] text-muted">
              <Icon name={n} className="size-7 text-primary" />
              {n}
            </div>
          ))}
        </div>
      </Block>

      <Block title="Section header">
        <SectionHeader eyebrow="Our treatments" title="Everything under one friendly roof" intro="Fourteen treatments grouped simply." />
      </Block>
    </main>
  );
}
