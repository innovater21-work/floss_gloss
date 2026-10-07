import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ClinicCTA } from "@/components/site/page-elements";
import { Photo } from "@/components/ui/photo";
import { blogPosts } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function formatDate(value: string) {
  return new Date(value + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: "/blog/" + post.slug },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.publishedAt },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Floss & Gloss Dental Clinic" },
    mainEntityOfPage: "https://floss-gloss.in/blog/" + post.slug,
  }).replace(/</g, "\\u003c");

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: post.title }]} />
      <article className="wrap max-w-[900px] pt-10 pb-14">
        <p className="mb-4 text-[14px] font-extrabold text-accent">{post.author} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></p>
        <h1 className="text-h2-xl">{post.title}</h1>
        <Photo {...post.image} sizes="(max-width: 900px) 100vw, 900px" className="mt-7 aspect-[16/8] rounded-band max-md:rounded-card" />
        <p className="mt-5 border-l-4 border-accent bg-soft p-5 text-[17px] text-ink">{post.excerpt}</p>
        <div className="mt-9 grid gap-8">
          {post.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 font-display text-[30px]">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-muted">{paragraph}</p>)}
            </section>
          ))}
        </div>
        <aside className="mt-10 rounded-card border border-line bg-bg-alt p-6">
          <h2 className="mb-3 font-display text-[23px]">Further reading</h2>
          <ul className="grid gap-2">
            {post.sources.map((source) => <li key={source.url}><a className="font-bold text-primary underline underline-offset-2" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}
          </ul>
          <p className="mt-5 text-[13px] text-muted">This article is general information and does not diagnose a condition or replace advice from your dentist.</p>
        </aside>
        <p className="mt-8"><Link className="font-extrabold text-primary underline underline-offset-4" href="/blog">← Back to the journal</Link></p>
      </article>
      <ClinicCTA title="Questions about your own dental health?" text="Talk to the dentist about your symptoms and the options that fit your needs." />
    </main>
  );
}
