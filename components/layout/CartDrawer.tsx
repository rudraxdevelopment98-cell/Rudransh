"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { EASE } from "@/lib/motion";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQuantity, remove } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-warmwhite"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-label="Cart"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-8 py-6">
              <h2 className="font-display text-h2 text-ink">Cart</h2>
              <button
                onClick={close}
                className="text-caption uppercase tracking-button hover:text-gold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8">
              {lines.length === 0 ? (
                <p className="py-16 text-center text-ink/60">
                  Your cart is quiet for now.
                </p>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {lines.map((line) => {
                    return (
                      <li key={line.productSlug} className="flex gap-4 py-6">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sharp bg-sand">
                          <Image
                            src={line.image}
                            alt={line.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <span className="font-display text-lg text-ink">
                              {line.name}
                            </span>
                            <span className="text-body">
                              {formatPrice(
                                line.price * line.quantity,
                                line.currency
                              )}
                            </span>
                          </div>
                          {line.subscription && (
                            <span className="label mt-1">Subscription</span>
                          )}
                          <div className="mt-auto flex items-center gap-4 pt-3">
                            <div className="flex items-center border border-ink/20">
                              <button
                                className="px-3 py-1 hover:text-gold"
                                onClick={() =>
                                  setQuantity(line.productSlug, line.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                              >
                                –
                              </button>
                              <span className="px-3 text-sm">
                                {line.quantity}
                              </span>
                              <button
                                className="px-3 py-1 hover:text-gold"
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
              )}
            </div>

            <div className="border-t border-ink/10 px-8 py-6">
              <div className="mb-5 flex justify-between text-body">
                <span className="label">Subtotal</span>
                <span className="font-display text-xl text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={close}
                className="btn-primary w-full"
              >
                View cart &amp; checkout
              </Link>
              <p className="mt-4 text-center text-xs text-ink/50">
                Taxes &amp; shipping calculated at checkout.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
