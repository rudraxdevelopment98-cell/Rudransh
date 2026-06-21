import Link from "next/link";
import type { Ritual } from "@/lib/types";

export function RitualCard({ ritual }: { ritual: Ritual }) {
  return (
    <Link
      href={`/rituals#${ritual.slug}`}
      className="group block border border-ink/10 bg-bone p-8 transition-colors hover:border-gold"
    >
      <p className="label">{ritual.timeOfDay}</p>
      <h3 className="mt-3 font-display text-2xl text-ink">
        {ritual.name}
      </h3>
      <p className="mt-3 text-ink/70">{ritual.intro}</p>
      <ol className="mt-6 space-y-3">
        {ritual.steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="font-display text-lg text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">
                {step.title}
              </span>
              <span className="text-sm text-ink/60">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </Link>
  );
}
