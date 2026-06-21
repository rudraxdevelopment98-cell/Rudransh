"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

type Tab = "benefits" | "usage" | "warnings" | "routine";

const TABS: { id: Tab; label: string }[] = [
  { id: "benefits", label: "Benefits" },
  { id: "usage", label: "Usage" },
  { id: "warnings", label: "Warnings" },
  { id: "routine", label: "Daily Routine" },
];

/**
 * Repeatable product education block (Benefits / Usage / Warnings / Daily
 * Routine) — sourced from CMS fields per keyFeatures.productEducationBlock.
 */
export function EducationModule({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("benefits");

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-ink/10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative pb-3 text-caption uppercase tracking-button transition-colors ${
              active === tab.id ? "text-ink" : "text-ink/40 hover:text-ink"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-px bg-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-8 text-ink/80">
        {active === "benefits" && (
          <ul className="space-y-3">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {active === "usage" && <p>{product.usage}</p>}
        {active === "warnings" && (
          <p className="text-ink/70">{product.warnings}</p>
        )}
        {active === "routine" && (
          <ul className="space-y-3">
            {product.dailyRoutine.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
