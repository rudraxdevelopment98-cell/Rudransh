import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { articles } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal",
  description: "Natural wellness, gently explained. Education from Rudransh.",
};

export default function JournalPage() {
  return (
    <div className="section pt-40 bg-warmwhite">
      <div className="container-luxe">
        <SectionHeading
          label="The Journal"
          title="Natural wellness, gently explained."
          intro="Considered reading on herbs, rituals, and the quiet practice of feeling well."
        />
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <RevealItem key={article.slug}>
              <Link href={`/journal/${article.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-sharp bg-sand">
                  <Image
                    src={article.hero}
                    alt={article.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[800ms] ease-editorial group-hover:scale-[1.03]"
                  />
                </div>
                <p className="label mt-5">{formatDate(article.publishedAt)}</p>
                <h2 className="mt-2 font-display text-2xl text-forest-deep">
                  {article.title}
                </h2>
                <p className="mt-2 text-ink/60">{article.excerpt}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
