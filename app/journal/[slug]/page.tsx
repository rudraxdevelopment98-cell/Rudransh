import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { articles, getArticle } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Article" };
  return { title: article.title, description: article.excerpt };
}

const GOAL_LABEL: Record<string, string> = {
  skin: "Skin",
  "stress-sleep": "Stress & Sleep",
  digestion: "Digestion",
  immunity: "Immunity",
};

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <article className="pt-20">
      <div className="relative aspect-[3/2] max-h-[70vh] w-full overflow-hidden bg-sand">
        <Image
          src={article.hero}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="container-luxe section">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="label">{formatDate(article.publishedAt)}</p>
            <h1 className="mt-4 font-display text-h1 text-forest-deep">
              {article.title}
            </h1>
          </Reveal>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
            <span className="label">Related goals</span>
            {article.relatedGoals.map((g) => (
              <Link
                key={g}
                href={`/goals/${g}`}
                className="text-caption uppercase tracking-button text-clay hover:text-gold"
              >
                {GOAL_LABEL[g]}
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/journal"
              className="text-caption uppercase tracking-button text-clay hover:text-gold"
            >
              ← All articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
