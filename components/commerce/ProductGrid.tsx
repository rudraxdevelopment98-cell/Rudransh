"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { GoalSlug, Product } from "@/lib/types";

const FILTERS: { label: string; value: GoalSlug | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Skin", value: "skin" },
  { label: "Stress & Sleep", value: "stress-sleep" },
  { label: "Digestion", value: "digestion" },
  { label: "Immunity", value: "immunity" },
];

export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<GoalSlug | "all">("all");

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.goalTags.includes(filter));

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-ink/10 pb-5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-caption uppercase tracking-button transition-colors ${
              filter === f.value
                ? "text-forest-deep"
                : "text-ink/40 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <RevealGroup
        key={filter}
        className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((product) => (
          <RevealItem key={product.slug}>
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
