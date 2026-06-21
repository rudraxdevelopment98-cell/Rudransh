"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { placeOrder } from "@/app/checkout/actions";

const SHIPPING_FLAT = 495;
const FREE_SHIPPING_OVER = 4000;

const FIELDS = [
  { name: "customerName", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address1", label: "Address line 1", type: "text", required: true },
  { name: "address2", label: "Address line 2 (optional)", type: "text", required: false },
  { name: "city", label: "City", type: "text", required: true },
  { name: "postcode", label: "Postcode", type: "text", required: true },
  { name: "country", label: "Country", type: "text", required: true },
] as const;

export function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping =
    lines.length === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await placeOrder({
      customerName: String(form.get("customerName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address1: String(form.get("address1") ?? ""),
      address2: String(form.get("address2") ?? ""),
      city: String(form.get("city") ?? ""),
      postcode: String(form.get("postcode") ?? ""),
      country: String(form.get("country") ?? ""),
      notes: String(form.get("notes") ?? ""),
      lines: lines.map((l) => ({
        slug: l.productSlug,
        quantity: l.quantity,
        subscription: l.subscription,
      })),
    });

    if (result.ok) {
      clear();
      router.push(`/order/${result.orderNumber}`);
    } else {
      setError(result.error);
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="py-12">
        <p className="text-ink/60">Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-16 lg:grid-cols-[3fr_2fr]">
      {/* details */}
      <div>
        <h2 className="font-display text-2xl text-forest-deep">
          Delivery details
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <label
              key={field.name}
              className={
                field.name === "address1" || field.name === "address2"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <span className="label">{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                required={field.required}
                className="mt-2 w-full border border-ink/20 bg-warmwhite px-4 py-3 text-ink focus:border-gold focus:outline-none"
              />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className="label">Order notes (optional)</span>
            <textarea
              name="notes"
              rows={3}
              className="mt-2 w-full border border-ink/20 bg-warmwhite px-4 py-3 text-ink focus:border-gold focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-8 border border-ink/10 bg-bone p-6">
          <p className="label">Payment</p>
          <p className="mt-2 text-ink/75">
            Cash on delivery. Pay when your order arrives — no card needed.
          </p>
        </div>
      </div>

      {/* summary */}
      <aside className="h-fit border border-ink/10 bg-bone p-8">
        <h2 className="font-display text-2xl text-forest-deep">Your order</h2>
        <ul className="mt-6 divide-y divide-ink/10">
          {lines.map((line) => (
            <li key={line.productSlug} className="flex gap-4 py-4">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sharp bg-sand">
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 justify-between">
                <span>
                  <span className="block font-display text-lg text-forest-deep">
                    {line.name}
                  </span>
                  <span className="text-sm text-ink/50">
                    Qty {line.quantity}
                    {line.subscription ? " · subscription" : ""}
                  </span>
                </span>
                <span className="text-body">
                  {formatPrice(line.price * line.quantity, line.currency)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 border-t border-ink/10 pt-6 text-body">
          <div className="flex justify-between">
            <span className="text-ink/60">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/60">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-display text-xl text-forest-deep">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {error && <p className="mt-5 text-sm text-clay">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-8 w-full disabled:opacity-50"
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
        <p className="mt-4 text-center text-xs text-ink/50">
          By placing this order you agree to our terms. Herbal product
          availability varies by region.
        </p>
      </aside>
    </form>
  );
}
