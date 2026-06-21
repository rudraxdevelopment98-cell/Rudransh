import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EducationModule } from "@/components/commerce/EducationModule";
import { AddToCart } from "@/components/commerce/AddToCart";
import { RitualCard } from "@/components/commerce/RitualCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  getProductBySlug,
  getRitualBySlug,
  getGoalBySlug,
} from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

const GOAL_LABEL: Record<string, string> = {
  skin: "Skin",
  "stress-sleep": "Stress & Sleep",
  digestion: "Digestion",
  immunity: "Immunity",
};

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  // Recommend the ritual tied to the product's first goal.
  const goal = product.goalTags[0]
    ? await getGoalBySlug(product.goalTags[0])
    : null;
  const ritual = goal
    ? await getRitualBySlug(goal.recommendedRitualSlug)
    : null;

  return (
    <div className="pt-20">
      <div className="container-luxe section">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* gallery */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sharp bg-sand">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {product.images[1] && (
              <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-sharp bg-sand">
                <Image
                  src={product.images[1]}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </Reveal>

          {/* details */}
          <Reveal className="lg:pl-8">
            <div className="flex flex-wrap gap-2">
              {product.goalTags.map((g) => (
                <Link
                  key={g}
                  href={`/goals/${g}`}
                  className="border border-ink/15 px-3 py-1 text-caption uppercase tracking-button text-clay transition-colors hover:border-gold"
                >
                  {GOAL_LABEL[g]}
                </Link>
              ))}
            </div>
            <h1 className="mt-5 font-display text-h1 text-ink">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-ink/70">
              {product.shortDescription}
            </p>
            <p className="mt-6 font-display text-2xl text-ink">
              {formatPrice(product.price, product.currency)}
            </p>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <div className="mt-6 border-t border-ink/10 pt-6">
              <p className="label mb-2">Ingredients</p>
              <p className="text-sm text-ink/70">
                {product.ingredients.join(" · ")}
              </p>
            </div>

            <div className="mt-12">
              <EducationModule product={product} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* recommended ritual */}
      {ritual && (
        <section className="section bg-bone">
          <div className="container-luxe">
            <p className="label mb-8 flex items-center gap-3">
              <span className="rule-gold" aria-hidden />
              Pairs with the ritual
            </p>
            <div className="max-w-xl">
              <RitualCard ritual={ritual} />
            </div>
          </div>
        </section>
      )}

      {/* compliance line */}
      <div className="bg-warmwhite">
        <div className="container-luxe pb-section">
          <p className="border-t border-ink/10 pt-8 text-xs text-ink/50">
            {product.warnings} This product is a food supplement and is not
            intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}
