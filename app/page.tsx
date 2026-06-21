import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { GoalTile } from "@/components/commerce/GoalTile";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getGoals,
  getProducts,
  getArticles,
  getFeaturedProduct,
} from "@/lib/queries";
import { formatPrice, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const TRUST = [
  { title: "Single-origin", detail: "Traceable herbs, sourced with care." },
  { title: "Nothing added", detail: "Pure formulations. No fillers, ever." },
  { title: "No claims, only craft", detail: "Honest, wellness-first language." },
  { title: "Carbon-conscious", detail: "Considered packaging and shipping." },
];

export default async function HomePage() {
  const [goals, products, articles, featured] = await Promise.all([
    getGoals(),
    getProducts(),
    getArticles(),
    getFeaturedProduct(),
  ]);

  return (
    <>
      <Hero />

      {/* Shop by Goal — primary discovery */}
      <section id="goals" className="section bg-warmwhite">
        <div className="container-luxe">
          <SectionHeading
            label="Shop by Goal"
            title="Start with how you want to feel."
            intro="Not by browsing jars. Choose a goal, and we'll guide you to the herbs and the ritual."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((goal) => (
              <RevealItem key={goal.slug}>
                <GoalTile goal={goal} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Brand story strip */}
      <section className="section bg-bone">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sharp">
            <Image
              src="https://images.unsplash.com/photo-1611073615830-9f76b6f3c3f0?auto=format&fit=crop&q=80&w=1400"
              alt="Botanical detail in warm natural light"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal>
            <p className="label mb-5 flex items-center gap-3">
              <span className="rule-gold" aria-hidden />
              Our philosophy
            </p>
            <h2 className="font-display text-h2 text-forest-deep">
              Traditional herbal knowledge, made simple for modern life.
            </h2>
            <p className="mt-6 text-ink/70">
              Rudransh exists to simplify natural wellness — to take the wisdom
              of time-honoured herbs and deliver it as a calm, considered daily
              practice. We believe in long-term balance over quick fixes, and in
              rituals you can actually keep.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                Read our story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured product — cinematic single showcase */}
      {featured && (
      <section className="section bg-forest-deep text-bone">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="label mb-5 text-gold">Featured</p>
            <h2 className="font-display text-h1 text-bone">{featured.name}</h2>
            <p className="mt-6 max-w-md text-bone/75">
              {featured.shortDescription}
            </p>
            <p className="mt-6 font-display text-2xl">
              {formatPrice(featured.price, featured.currency)}
            </p>
            <div className="mt-8">
              <ButtonLink
                href={`/products/${featured.slug}`}
                variant="secondary"
                className="border-gold text-bone"
              >
                Discover {featured.name}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-sharp">
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* Subscription teaser */}
      <section className="section bg-warmwhite">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-sharp bg-forest-moss">
            <Image
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1800"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="relative grid gap-8 p-12 lg:grid-cols-2 lg:items-center lg:p-20">
              <Reveal>
                <p className="label mb-5 text-gold">The monthly ritual</p>
                <h2 className="font-display text-h2 text-bone">
                  A curated kit, delivered to your door.
                </h2>
                <p className="mt-5 max-w-md text-bone/80">
                  Build a routine around your goal. Pause, skip, or change
                  cadence anytime — wellness on your terms.
                </p>
              </Reveal>
              <Reveal className="lg:justify-self-end">
                <ButtonLink
                  href="/subscriptions"
                  variant="secondary"
                  className="border-bone text-bone"
                >
                  Explore subscriptions
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products grid */}
      <section className="section bg-bone">
        <div className="container-luxe">
          <div className="flex items-end justify-between">
            <SectionHeading
              label="The collection"
              title="Considered, single-origin herbs."
            />
            <Link
              href="/products"
              className="hidden text-caption uppercase tracking-button text-clay hover:text-gold sm:inline"
            >
              View all →
            </Link>
          </div>
          <RevealGroup className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <RevealItem key={product.slug}>
                <ProductCard product={product} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Journal preview */}
      <section className="section bg-warmwhite">
        <div className="container-luxe">
          <SectionHeading
            label="The Journal"
            title="Natural wellness, gently explained."
          />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
            {articles.map((article) => (
              <RevealItem key={article.slug}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sharp bg-sand">
                    <Image
                      src={article.hero}
                      alt={article.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[800ms] ease-editorial group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="label mt-5">{formatDate(article.publishedAt)}</p>
                  <h3 className="mt-2 font-display text-2xl text-forest-deep">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-ink/60">{article.excerpt}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-forest-deep py-20 text-bone">
        <div className="container-luxe grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item) => (
            <div key={item.title}>
              <span className="rule-gold mb-5 block" aria-hidden />
              <h3 className="font-display text-xl text-bone">{item.title}</h3>
              <p className="mt-2 text-sm text-bone/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
