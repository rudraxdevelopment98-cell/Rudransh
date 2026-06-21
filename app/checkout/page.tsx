import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — cash on delivery.",
};

export default function CheckoutPage() {
  return (
    <div className="section pt-40 bg-warmwhite min-h-screen">
      <div className="container-luxe">
        <h1 className="font-display text-h1 text-forest-deep">Checkout</h1>
        <p className="mt-3 text-ink/60">
          A few details and your ritual is on its way.
        </p>
        <div className="mt-12">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
