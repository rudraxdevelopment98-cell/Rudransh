import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warmwhite">
      <div className="container-luxe text-center">
        <p className="label">404</p>
        <h1 className="mt-4 font-display text-h1 text-forest-deep">
          This page has gone quiet.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink/60">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s return
          to something grounding.
        </p>
        <Link href="/" className="btn-primary mt-10 inline-flex">
          Back home
        </Link>
      </div>
    </div>
  );
}
