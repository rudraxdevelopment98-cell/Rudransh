import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubscriptionTierCard } from "@/components/commerce/SubscriptionTierCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { subscriptionTiers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Subscriptions",
  description:
    "Curated monthly herbal kits, built around your goal. Pause, skip, or change cadence anytime.",
};

const STEPS = [
  { n: "01", title: "Choose your kit", detail: "Pick a tier that matches your routine." },
  { n: "02", title: "Set your cadence", detail: "Monthly or every two months — your call." },
  { n: "03", title: "Receive & adjust", detail: "Pause, skip, or change anytime, easily." },
];

export default function SubscriptionsPage() {
  return (
    <>
      <section className="section pt-40 bg-warmwhite">
        <div className="container-luxe">
          <SectionHeading
            label="Subscriptions"
            title="A ritual that arrives on its own."
            intro="Recurring kits built around your wellness goal — curated, refreshed, and entirely on your terms."
            align="center"
          />
        </div>
      </section>

      <section className="bg-bone py-section">
        <div className="container-luxe">
          <RevealGroup className="grid gap-8 lg:grid-cols-3">
            {subscriptionTiers.map((tier) => (
              <RevealItem key={tier.slug}>
                <SubscriptionTierCard tier={tier} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-warmwhite">
        <div className="container-luxe">
          <SectionHeading label="How it works" title="Simple, by design." />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((step) => (
              <RevealItem key={step.n}>
                <span className="font-display text-4xl text-gold">{step.n}</span>
                <h3 className="mt-4 font-display text-2xl text-forest-deep">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink/60">{step.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-16">
            <p className="text-xs text-ink/50">
              Subscriptions are powered by Shopify subscription tooling. Herbal
              product availability varies by country — some items may not ship to
              your region.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
