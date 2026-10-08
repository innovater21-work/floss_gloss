import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageIntro } from "@/components/site/page-elements";
import { Photo } from "@/components/ui/photo";
import { blogPosts } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Health Journal",
  description: "Practical dental health articles from Floss & Gloss Dental Clinic in Shela, Ahmedabad.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string) {
  return new Date(value + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function BlogPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Journal" }]} />
      <PageIntro eyebrow="From the clinic" title="Small notes for healthier smiles." description="Straightforward information for families. For personal advice, please speak with a dental professional." />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-2 gap-5 max-md:grid-cols-1 grid-center-last-two grid-center-last-two-gap-5">
          {blogPosts.map((post, index) => (
            <article key={post.slug} className={"flex flex-col rounded-card border p-7 " + (index % 3 === 0 ? "border-transparent bg-soft" : "border-line bg-surface")}>
              <Photo {...post.image} sizes="(max-width: 640px) 100vw, 50vw" className="mb-5 aspect-[16/9] rounded-lg" />
              <p className="mb-3 text-[13px] font-extrabold text-accent"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.author}</p>
              <h2 className="mb-3 font-display text-[28px] leading-tight"><Link href={"/blog/" + post.slug} className="hover:text-accent">{post.title}</Link></h2>
              <p className="mb-6 text-muted">{post.excerpt}</p>
              <Link className="mt-auto inline-flex items-center gap-2 font-extrabold text-primary" href={"/blog/" + post.slug}>Read article <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
