"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Product } from "@/lib/types";

/** Minimal shape needed to add something to the cart. */
type AddInput = Pick<Product, "slug" | "name" | "price" | "currency"> & {
  image: string;
};

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: AddInput, opts?: { subscription?: boolean }) => void;
  remove: (productSlug: string) => void;
  setQuantity: (productSlug: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rudransh-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add: CartContextValue["add"] = useCallback((product, opts) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productSlug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.productSlug === product.slug
            ? { ...l, quantity: l.quantity + 1 }
            : l
        );
      }
      return [
        ...prev,
        {
          productSlug: product.slug,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.image,
          quantity: 1,
          subscription: opts?.subscription,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const remove: CartContextValue["remove"] = useCallback((productSlug) => {
    setLines((prev) => prev.filter((l) => l.productSlug !== productSlug));
  }, []);

  const setQuantity: CartContextValue["setQuantity"] = useCallback(
    (productSlug, quantity) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.productSlug !== productSlug)
          : prev.map((l) =>
              l.productSlug === productSlug ? { ...l, quantity } : l
            )
      );
    },
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      c += line.quantity;
      s += line.price * line.quantity;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add,
    remove,
    setQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
