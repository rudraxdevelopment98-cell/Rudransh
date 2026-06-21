import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { rituals, getProduct } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rituals",
  description:
    "Guided daily routines that bundle herbs by goal — wellness as a practice, not a purchase.",
};

const GOAL_LABEL: Record<string, string> = {
  skin: "Skin",
  "stress-sleep": "Stress & Sleep",
  digestion: "Digestion",
  immunity: "Immunity",
};

export default function RitualsPage() {
  return (
    <div className="section pt-40 bg-warmwhite">
      <div className="container-luxe">
        <SectionHeading
          label="Rituals"
          title="Wellness as a daily practice."
          intro="Each ritual gathers the herbs for a single goal into a routine you can keep. A gentle, complete way to begin or end the day."
        />

        <div className="mt-20 space-y-24">
          {rituals.map((ritual) => {
            const items = ritual.productSlugs
              .map((slug) => getProduct(slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            return (
              <Reveal as="section" key={ritual.slug}>
                <div id={ritual.slug} className="scroll-mt-28">
                  <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                    {/* ritual overview */}
                    <div>
                      <p className="label">{ritual.timeOfDay}</p>
                      <h2 className="mt-3 font-display text-h2 text-forest-deep">
                        {ritual.name}
                      </h2>
                      <Link
                        href={`/goals/${ritual.goal}`}
                        className="mt-3 inline-block text-caption uppercase tracking-button text-clay hover:text-gold"
                      >
                        For {GOAL_LABEL[ritual.goal]} →
                      </Link>
                      <p className="mt-5 text-ink/70">{ritual.intro}</p>
                      <ol className="mt-8 space-y-5">
                        {ritual.steps.map((step, i) => (
                          <li key={step.title} className="flex gap-4">
                            <span className="font-display text-xl text-gold">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <span className="block font-medium text-forest-deep">
                                {step.title}
                              </span>
                              <span className="text-sm text-ink/60">
                                {step.detail}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* the products in the ritual */}
                    <RevealGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
                      {items.map((product) => (
                        <RevealItem key={product.slug}>
                          <ProductCard product={product} />
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
