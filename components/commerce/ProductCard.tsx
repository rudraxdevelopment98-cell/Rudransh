import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const GOAL_LABEL: Record<string, string> = {
  skin: "Skin",
  "stress-sleep": "Stress & Sleep",
  digestion: "Digestion",
  immunity: "Immunity",
};

/** Tall, image-led, no badges. Hover cross-fades to the second image. */
export function ProductCard({ product }: { product: Product }) {
  const [primary, secondary] = product.images;
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sharp bg-sand">
        <Image
          src={primary}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[800ms] ease-editorial group-hover:scale-[1.03]"
        />
        {secondary && (
          <Image
            src={secondary}
            alt=""
            aria-hidden
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-[800ms] ease-editorial group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-5">
        {product.goalTags[0] && (
          <span className="label">{GOAL_LABEL[product.goalTags[0]]}</span>
        )}
        <h3 className="mt-2 font-display text-2xl text-forest-deep">
          {product.name}
        </h3>
        <p className="mt-1 text-ink/60">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
