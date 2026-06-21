import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your orders and subscriptions.",
};

const PANELS = [
  {
    title: "Orders",
    detail: "Track current orders and revisit past purchases.",
  },
  {
    title: "Subscriptions",
    detail: "Pause, skip, change cadence, or update your kit anytime.",
  },
  {
    title: "Details",
    detail: "Manage delivery addresses and contact preferences.",
  },
];

export default function AccountPage() {
  return (
    <div className="section pt-40 bg-warmwhite min-h-screen">
      <div className="container-luxe">
        <SectionHeading
          label="Account"
          title="Your wellness, managed."
          intro="Sign in to manage orders and subscriptions. Authentication connects to Shopify customer accounts."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PANELS.map((panel) => (
            <div key={panel.title} className="border border-ink/10 bg-bone p-8">
              <h2 className="font-display text-2xl text-forest-deep">
                {panel.title}
              </h2>
              <p className="mt-3 text-ink/60">{panel.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <button className="btn-primary" disabled>
            Sign in
          </button>
          <Link href="/products" className="btn-secondary">
            Continue shopping
          </Link>
        </div>
        <p className="mt-6 text-xs text-ink/50">
          Customer accounts activate once the Shopify Storefront API is
          connected.
        </p>
      </div>
    </div>
  );
}
