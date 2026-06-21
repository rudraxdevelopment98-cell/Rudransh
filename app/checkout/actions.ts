"use server";

import { prisma } from "@/lib/db";

export interface CheckoutLine {
  slug: string;
  quantity: number;
  subscription?: boolean;
}

export interface CheckoutInput {
  customerName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  country: string;
  notes?: string;
  lines: CheckoutLine[];
}

export type CheckoutResult =
  | { ok: true; orderNumber: string }
  | { ok: false; error: string };

// Flat shipping, free over the threshold. Tune freely — this is yours.
const SHIPPING_FLAT = 495; // £4.95
const FREE_SHIPPING_OVER = 4000; // £40.00

function required(value: string | undefined, label: string): string {
  const v = (value ?? "").trim();
  if (!v) throw new Error(`${label} is required.`);
  return v;
}

function makeOrderNumber(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RW-${t}-${r}`;
}

export async function placeOrder(
  input: CheckoutInput
): Promise<CheckoutResult> {
  try {
    if (!input.lines?.length) {
      return { ok: false, error: "Your cart is empty." };
    }

    const customerName = required(input.customerName, "Name");
    const email = required(input.email, "Email");
    const phone = required(input.phone, "Phone");
    const address1 = required(input.address1, "Address");
    const city = required(input.city, "City");
    const postcode = required(input.postcode, "Postcode");
    const country = required(input.country, "Country");

    // Re-price from the database — never trust client-supplied amounts.
    const slugs = input.lines.map((l) => l.slug);
    const products = await prisma.product.findMany({
      where: { slug: { in: slugs }, active: true },
    });
    const bySlug = new Map(products.map((p) => [p.slug, p]));

    const items = input.lines.map((line) => {
      const product = bySlug.get(line.slug);
      if (!product) throw new Error(`A product is no longer available.`);
      const quantity = Math.max(1, Math.floor(line.quantity));
      return {
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        unitPrice: product.price,
        quantity,
        subscription: Boolean(line.subscription),
      };
    });

    const subtotal = items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;
    const currency = products[0]?.currency ?? "GBP";

    const order = await prisma.order.create({
      data: {
        orderNumber: makeOrderNumber(),
        customerName,
        email,
        phone,
        address1,
        address2: input.address2?.trim() || null,
        city,
        postcode,
        country,
        notes: input.notes?.trim() || null,
        subtotal,
        shipping,
        total,
        currency,
        paymentMethod: "cod",
        status: "pending",
        items: { create: items },
      },
    });

    return { ok: true, orderNumber: order.orderNumber };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return { ok: false, error: message };
  }
}
