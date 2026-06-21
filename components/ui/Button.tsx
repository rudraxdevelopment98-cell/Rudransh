import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

const cls = (variant: Variant, className = "") =>
  `${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`.trim();

export function Button({
  variant = "primary",
  className,
  ...props
}: { variant?: Variant } & ComponentPropsWithoutRef<"button">) {
  return <button className={cls(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cls(variant, className)}>
      {children}
    </Link>
  );
}
