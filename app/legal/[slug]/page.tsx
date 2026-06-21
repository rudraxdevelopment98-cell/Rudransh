import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Legal pages (compliance.legalPages). Placeholder copy — replace with
 * counsel-reviewed text before launch. Herbal/supplement rules differ by
 * country; the disclaimer surfaces region-specific framing.
 */
const PAGES: Record<string, { title: string; body: string[] }> = {
  terms: {
    title: "Terms of Service",
    body: [
      "These terms govern your use of the Rudransh Wellness website and your purchase of our products. By using this site you agree to them.",
      "Placeholder content — replace with your finalised, legally reviewed Terms of Service before launch.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We respect your privacy and handle personal data in line with applicable data protection law (including UK GDPR and EU GDPR where relevant).",
      "Placeholder content — replace with your finalised, legally reviewed Privacy Policy before launch.",
    ],
  },
  "shipping-returns": {
    title: "Shipping & Returns",
    body: [
      "We ship to selected countries. Herbal product availability and customs rules vary by region — some items may not be available in your country.",
      "Placeholder content — replace with your finalised shipping and returns policy before launch.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      "Rudransh Wellness products are food supplements and lifestyle products. They are not intended to diagnose, treat, cure, or prevent any disease.",
      "Statements on this site have not been evaluated by any medical or regulatory authority. Always consult a qualified healthcare professional before starting any new supplement, particularly if you are pregnant, nursing, taking medication, or managing a health condition.",
      "Herbal and supplement regulations differ by country (UK, EU, US, and others). Availability, permitted claims, and ingredient restrictions vary by market.",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    body: [
      "We use cookies to operate the site, remember your cart, and understand how the site is used.",
      "Placeholder content — replace with your finalised cookie policy and consent details before launch.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = PAGES[params.slug];
  return { title: page?.title ?? "Legal" };
}

export default function LegalPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = PAGES[params.slug];
  if (!page) notFound();

  return (
    <div className="section pt-40 bg-warmwhite min-h-screen">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="label">Legal</p>
            <h1 className="mt-4 font-display text-h1 text-forest-deep">
              {page.title}
            </h1>
          </Reveal>
          <div className="mt-10 space-y-6 leading-relaxed text-ink/75">
            {page.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
