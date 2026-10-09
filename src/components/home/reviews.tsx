import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { GoogleLogo } from "@/components/ui/icon";
import { SectionHeader, Stars } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { clinic, reviews } from "@/content/site";

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-y">
      <div className="wrap">
        <SectionHeader eyebrow="Kind words" title="Patients now smiling" className="mb-10">
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5">
            <GoogleLogo />
            <b className="text-[22px]">{clinic.rating}</b>
            <Stars />
            <span className="text-muted">{clinic.reviewCount} reviews</span>
            <ButtonLink variant="outline" size="sm" href={clinic.googleSearchUrl} target="_blank" rel="noopener noreferrer">Find us on Google</ButtonLink>
            <ButtonLink variant="outline" size="sm" href={clinic.googleReviewUrl} target="_blank" rel="noopener noreferrer">Write a Google review</ButtonLink>
          </div>
        </SectionHeader>
        <div className="columns-3 gap-[22px] max-lg:columns-2 max-md:columns-1">
          {reviews.map((review, index) => (
            <article key={review.name} className={cn("relative mb-[22px] break-inside-avoid rounded-[26px] border p-7", index % 3 === 0 ? "border-transparent bg-soft" : "border-line bg-surface", index % 3 === 1 && "rotate-[-1deg]", index % 3 === 2 && "rotate-[1deg]")}>
              <span aria-hidden="true" className="block h-7 font-display text-[64px] leading-[.6] text-accent">“</span>
              <p className="mt-2 mb-[18px] text-[16px]">{review.text}</p>
              <div className="flex items-center gap-3 text-[15px] font-extrabold">
                <i className="grid size-10 place-items-center rounded-full bg-primary text-on-primary not-italic">{review.name.trim()[0].toUpperCase()}</i>
                <span>{review.name}<small className="block text-[13px] font-semibold text-muted"><Stars /> on Google</small></span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-[14px] text-muted"><Link className="font-extrabold text-primary underline underline-offset-4" href="/contact">Read more or leave feedback at the clinic</Link></p>
      </div>
    </section>
  );
}
