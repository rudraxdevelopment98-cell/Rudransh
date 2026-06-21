import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { logout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Subscribers", href: "/admin/subscribers" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-warmwhite">
      <header className="border-b border-ink/10 bg-bone">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-xl text-forest-deep">
              Rudransh · Admin
            </Link>
            <nav className="hidden gap-6 md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-caption uppercase tracking-button text-ink/60 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-caption uppercase tracking-button text-ink/50 hover:text-gold"
            >
              View site
            </Link>
            <span className="text-sm text-ink/50">{admin.username}</span>
            <form action={logout}>
              <button className="text-caption uppercase tracking-button text-clay hover:text-gold">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-6 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-caption uppercase tracking-button text-ink/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
