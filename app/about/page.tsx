import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our vision, mission, sourcing, and ethos — a trusted global wellness brand that simplifies herbal health for modern life.",
};

const MISSION = [
  "Provide pure and effective herbal products",
  "Educate users about natural wellness",
  "Build personalised herbal health routines",
  "Promote long-term wellness over quick fixes",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=2200"
          alt="Herbs drying in warm natural light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-forest-deep/30" />
        <div className="container-luxe relative pb-20 pt-40">
          <p className="text-caption uppercase tracking-label text-gold">
            Our story
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-hero text-paper">
            Rooted in nature, built for today.
          </h1>
        </div>
      </section>

      <section className="section bg-warmwhite">
        <div className="container-luxe grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="label mb-5">Vision</p>
            <h2 className="font-display text-h2 text-ink">
              To become a trusted global wellness brand that simplifies herbal
              health for modern life.
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/75">
              Rudransh began with a simple frustration: traditional herbal
              wisdom is powerful, but the way it&apos;s sold is overwhelming.
              Endless jars, unfamiliar names, no guidance. We set out to change
              that — to turn ancient knowledge into a calm, modern practice
              anyone can keep.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              We are not a pharmacy, and we make no medical claims. We are a
              lifestyle brand for considered, everyday natural wellness.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="container-luxe">
          <SectionHeading label="Mission" title="What we set out to do." />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2">
            {MISSION.map((item, i) => (
              <RevealItem
                key={item}
                className="flex gap-5 border-t border-ink/10 pt-6"
              >
                <span className="font-display text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg text-ink">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-forest-deep text-paper">
        <div className="container-luxe max-w-3xl">
          <p className="label mb-5 text-gold">Sourcing & ethos</p>
          <h2 className="font-display text-h2 text-paper">
            Purity first. Always traceable.
          </h2>
          <p className="mt-6 text-paper/75">
            We work with growers who share our standards: single-origin herbs,
            slow processing, and nothing added. Every product carries clear
            ingredients, usage, and honest guidance — never hype, never a cure.
          </p>
        </div>
      </section>
    </>
  );
}
