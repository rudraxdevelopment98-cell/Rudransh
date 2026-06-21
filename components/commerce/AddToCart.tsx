"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/types";

/** Add-to-cart with an optional subscribe toggle for subscribable products. */
export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [subscribe, setSubscribe] = useState(false);

  return (
    <div>
      {product.subscribable && (
        <fieldset className="mb-6 grid gap-3 sm:grid-cols-2">
          <label
            className={`cursor-pointer border px-5 py-4 transition-colors ${
              !subscribe ? "border-forest-deep" : "border-ink/20"
            }`}
          >
            <input
              type="radio"
              name="purchase"
              className="sr-only"
              checked={!subscribe}
              onChange={() => setSubscribe(false)}
            />
            <span className="block text-caption uppercase tracking-button">
              One-time
            </span>
            <span className="mt-1 block text-sm text-ink/60">
              A single delivery
            </span>
          </label>
          <label
            className={`cursor-pointer border px-5 py-4 transition-colors ${
              subscribe ? "border-forest-deep" : "border-ink/20"
            }`}
          >
            <input
              type="radio"
              name="purchase"
              className="sr-only"
              checked={subscribe}
              onChange={() => setSubscribe(true)}
            />
            <span className="block text-caption uppercase tracking-button">
              Subscribe
            </span>
            <span className="mt-1 block text-sm text-ink/60">
              Delivered monthly · pause anytime
            </span>
          </label>
        </fieldset>
      )}

      <button
        onClick={() =>
          add(
            {
              slug: product.slug,
              name: product.name,
              price: product.price,
              currency: product.currency,
              image: product.images[0],
            },
            { subscription: subscribe }
          )
        }
        className="btn-primary w-full"
      >
        Add to cart
      </button>
    </div>
  );
}
