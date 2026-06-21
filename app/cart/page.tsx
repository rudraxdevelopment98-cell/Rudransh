"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { isShopifyConfigured } from "@/lib/shopify";

export default function CartPage() {
  const { lines, subtotal, setQuantity, remove } = useCart();
  const [notice, setNotice] = useState("");

  const onCheckout = () => {
    // When the Storefront API is wired, this creates a cart and redirects to
    // Shopify's hosted checkout (cart.checkoutUrl). Until then, inform the user.
    if (!isShopifyConfigured) {
      setNotice(
        "Checkout connects to Shopify once SHOPIFY_STOREFRONT_ACCESS_TOKEN is configured."
      );
      return;
    }
    // TODO: createCart → redirect to checkoutUrl
  };

  return (
    <div className="section pt-40 bg-warmwhite min-h-screen">
      <div className="container-luxe">
        <h1 className="font-display text-h1 text-forest-deep">Cart</h1>

        {lines.length === 0 ? (
          <div className="mt-12">
            <p className="text-ink/60">Your cart is quiet for now.</p>
            <Link href="/products" className="btn-primary mt-8 inline-flex">
              Explore products
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-16 lg:grid-cols-[2fr_1fr]">
            {/* lines */}
            <ul className="divide-y divide-ink/10 border-t border-ink/10">
              {lines.map((line) => {
                const product = products.find(
                  (p) => p.slug === line.productSlug
                );
                if (!product) return null;
                return (
                  <li key={line.productSlug} className="flex gap-6 py-8">
                    <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-sharp bg-sand">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-display text-2xl text-forest-deep hover:text-clay"
                        >
                          {product.name}
                        </Link>
                        <span className="font-display text-xl">
                          {formatPrice(
                            product.price * line.quantity,
                            product.currency
                          )}
                        </span>
                      </div>
                      {line.subscription && (
                        <span className="label mt-1">
                          Subscription · monthly
                        </span>
                      )}
                      <p className="mt-2 max-w-md text-sm text-ink/60">
                        {product.shortDescription}
                      </p>
                      <div className="mt-auto flex items-center gap-6 pt-4">
                        <div className="flex items-center border border-ink/20">
                          <button
                            className="px-4 py-2 hover:text-gold"
                            onClick={() =>
                              setQuantity(line.productSlug, line.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span className="px-4">{line.quantity}</span>
                          <button
                            className="px-4 py-2 hover:text-gold"
                            onClick={() =>
                              setQuantity(line.productSlug, line.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-caption uppercase tracking-button text-ink/50 hover:text-clay"
                          onClick={() => remove(line.productSlug)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* summary */}
            <aside className="h-fit border border-ink/10 bg-bone p-8">
              <h2 className="font-display text-2xl text-forest-deep">Summary</h2>
              <div className="mt-6 flex justify-between text-body">
                <span className="text-ink/60">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-3 flex justify-between text-body">
                <span className="text-ink/60">Shipping</span>
                <span className="text-ink/50">Calculated at checkout</span>
              </div>
              <div className="mt-6 flex justify-between border-t border-ink/10 pt-6 font-display text-xl text-forest-deep">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <button onClick={onCheckout} className="btn-primary mt-8 w-full">
                Checkout
              </button>
              {notice && (
                <p className="mt-4 text-xs text-clay">{notice}</p>
              )}
              <p className="mt-4 text-xs text-ink/50">
                Secure checkout powered by Shopify. Taxes &amp; shipping
                calculated at the next step.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
