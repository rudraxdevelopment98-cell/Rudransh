import Image from "next/image";
import Link from "next/link";
import type { Goal } from "@/lib/types";

/** Large editorial tile — the primary discovery entry point (Shop by Goal). */
export function GoalTile({ goal }: { goal: Goal }) {
  return (
    <Link href={`/goals/${goal.slug}`} className="group relative block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sharp bg-forest-moss">
        <Image
          src={goal.heroImage}
          alt={goal.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover opacity-90 transition-transform duration-[800ms] ease-editorial group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="text-caption uppercase tracking-label text-gold">
            {goal.tagline}
          </p>
          <h3 className="mt-2 font-display text-3xl text-paper">{goal.name}</h3>
          <span className="mt-3 inline-block text-caption uppercase tracking-button text-paper/80 transition-colors group-hover:text-gold">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
