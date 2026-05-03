import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import { getPost, getPosts } from "@/lib/blog";
import { CtaSection } from "@/components/cta-section";
import { FadeUp } from "@/components/motion";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPosts(locale).map((p) => ({ locale, slug: p.slug })),
  );
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const lc: Locale = isLocale(params.locale) ? params.locale : "en";
  const post = getPost(lc, params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const lc: Locale = isLocale(params.locale) ? params.locale : "en";
  const post = getPost(lc, params.slug);
  const t = getT(lc);
  const base = lc === "en" ? "" : `/${lc}`;
  if (!post) notFound();

  const formatter = new Intl.DateTimeFormat(lc === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <article className="pt-[100px] lg:pt-[120px] pb-20">
        <div className="container-tight">
          <FadeUp>
            <Link
              href={`${base}/blog`}
              className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-brand transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t.blog.backToList}
            </Link>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-6">
            <span className="inline-flex items-center text-[12px] tracking-[0.16em] uppercase text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="mt-5 font-serif text-display-lg text-brand-deep text-balance leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-5 text-[13.5px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
                {formatter.format(new Date(post.date))}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" strokeWidth={1.8} />
                {post.minutes} {t.blog.minutes}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-6 prose-essay">
            {post.body.map((p, i) => (
              <p key={i} className="mt-6 first:mt-0 text-[17px] leading-[1.8] text-ink/85 text-pretty">
                {p}
              </p>
            ))}
            <p className="mt-6 text-[14px] tracking-[0.14em] uppercase text-gold">— Dr. Nicole Hani</p>
          </FadeUp>
        </div>
      </article>
      <CtaSection locale={lc} />
    </>
  );
}
