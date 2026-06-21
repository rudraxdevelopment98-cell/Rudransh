import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { RitualCard } from "@/components/commerce/RitualCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getGoalBySlug,
  getProductBySlug,
  getRitualBySlug,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { goal: string };
}): Promise<Metadata> {
  const goal = await getGoalBySlug(params.goal);
  if (!goal) return { title: "Goal" };
  return { title: goal.name, description: goal.intro };
}

export default async function GoalPage({
  params,
}: {
  params: { goal: string };
}) {
  const goal = await getGoalBySlug(params.goal);
  if (!goal) notFound();

  const matchedResults = await Promise.all(
    goal.matchedProductSlugs.map((slug) => getProductBySlug(slug))
  );
  const matched = matchedResults.filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const ritual = await getRitualBySlug(goal.recommendedRitualSlug);

  return (
    <>
      {/* goal hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src={goal.heroImage}
          alt={goal.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-forest-deep/30" />
        <div className="container-luxe relative pb-20 pt-40">
          <p className="text-caption uppercase tracking-label text-gold">
            Shop by Goal
          </p>
          <h1 className="mt-5 font-display text-hero text-paper">{goal.name}</h1>
          <p className="mt-5 max-w-xl text-lg text-paper/80">{goal.intro}</p>
        </div>
      </section>

      {/* the herbs behind it */}
      <section className="section bg-warmwhite">
        <div className="container-luxe">
          <SectionHeading label="The herbs" title="What's behind it." />
          <RevealGroup className="mt-10 flex flex-wrap gap-4">
            {goal.herbs.map((herb) => (
              <RevealItem key={herb}>
                <span className="border border-ink/15 px-6 py-3 font-display text-xl text-ink">
                  {herb}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* matched products */}
      <section className="section bg-bone">
        <div className="container-luxe">
          <SectionHeading
            label="Matched products"
            title={`Considered for ${goal.name.toLowerCase()}.`}
          />
          <RevealGroup className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {matched.map((product) => (
              <RevealItem key={product.slug}>
                <ProductCard product={product} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* recommended ritual */}
      {ritual && (
        <section className="section bg-warmwhite">
          <div className="container-luxe">
            <SectionHeading
              label="Recommended ritual"
              title="Make it a daily practice."
            />
            <Reveal className="mt-12 max-w-xl">
              <RitualCard ritual={ritual} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
