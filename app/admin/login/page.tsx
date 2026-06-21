import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  // Already signed in? Skip the form.
  if (await getAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone">
      <div className="w-full max-w-sm px-6">
        <p className="label text-center">Rudransh</p>
        <h1 className="mt-3 text-center font-display text-h2 text-ink">
          Admin
        </h1>
        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
