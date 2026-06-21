import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
}: {
  label?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {label && (
        <p className="label mb-5 flex items-center gap-3">
          <span className="rule-gold" aria-hidden />
          {label}
        </p>
      )}
      <h2 className="font-display text-h2 text-ink">{title}</h2>
      {intro && <p className="mt-5 text-ink/70">{intro}</p>}
    </Reveal>
  );
}
