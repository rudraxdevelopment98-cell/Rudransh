"use client";

import { useState } from "react";
import type { SubscriptionTier } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";

export function SubscriptionTierCard({ tier }: { tier: SubscriptionTier }) {
  const [cadence, setCadence] = useState(tier.cadenceOptions[0]);
  const { open } = useCart();

  return (
    <div
      className={`flex flex-col p-8 ${
        tier.featured
          ? "bg-forest-deep text-paper"
          : "border border-ink/10 bg-bone text-ink"
      }`}
    >
      {tier.featured && (
        <span className="label mb-4 text-gold">Most chosen</span>
      )}
      <h3
        className={`font-display text-2xl ${
          tier.featured ? "text-paper" : "text-ink"
        }`}
      >
        {tier.name}
      </h3>
      <p
        className={`mt-3 ${tier.featured ? "text-paper/70" : "text-ink/70"}`}
      >
        {tier.description}
      </p>

      <p className="mt-6 font-display text-3xl">
        {formatPrice(tier.pricePerMonth, tier.currency)}
        <span
          className={`ml-1 text-base ${
            tier.featured ? "text-paper/60" : "text-ink/50"
          }`}
        >
          / month
        </span>
      </p>

      <ul className="mt-6 space-y-3">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm">
            <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <label
          className={`text-caption uppercase tracking-label ${
            tier.featured ? "text-paper/60" : "text-ink/50"
          }`}
        >
          Delivery cadence
        </label>
        <div className="mt-3 flex gap-2">
          {tier.cadenceOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setCadence(opt)}
              className={`border px-4 py-2 text-xs uppercase tracking-button transition-colors ${
                cadence === opt
                  ? "border-gold text-gold"
                  : tier.featured
                  ? "border-paper/30 text-paper/70"
                  : "border-ink/20 text-ink/60"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={open}
        className={`mt-8 w-full ${
          tier.featured ? "btn-secondary border-gold text-paper" : "btn-primary"
        }`}
      >
        Choose {tier.name.replace("The ", "")}
      </button>
    </div>
  );
}
