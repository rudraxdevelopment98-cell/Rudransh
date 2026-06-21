"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
  getAdmin,
} from "@/lib/auth";

/* ── auth ─────────────────────────────────────────────────────────────────── */

export async function login(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid username or password." };
  }
  setSessionCookie(user.id);
  redirect("/admin");
}

export async function logout() {
  clearSessionCookie();
  redirect("/admin/login");
}

async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

// Split a textarea into a clean JSON array string (one item per line).
function listFromText(value: FormDataEntryValue | null): string {
  const items = String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

function productDataFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    price: Math.max(0, Math.round(Number(formData.get("price") ?? 0))),
    currency: String(formData.get("currency") ?? "GBP").trim() || "GBP",
    images: listFromText(formData.get("images")),
    goalTags: listFromText(formData.get("goalTags")),
    benefits: listFromText(formData.get("benefits")),
    usage: String(formData.get("usage") ?? "").trim(),
    warnings: String(formData.get("warnings") ?? "").trim(),
    dailyRoutine: listFromText(formData.get("dailyRoutine")),
    ingredients: listFromText(formData.get("ingredients")),
    subscribable: formData.get("subscribable") === "on",
    featured: formData.get("featured") === "on",
    active: formData.get("active") !== "off",
    stock: Math.max(0, Math.round(Number(formData.get("stock") ?? 0))),
  };
}

/* ── products ─────────────────────────────────────────────────────────────── */

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = productDataFromForm(formData);
  if (!data.slug || !data.name) {
    throw new Error("Slug and name are required.");
  }
  await prisma.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = productDataFromForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

/* ── orders ───────────────────────────────────────────────────────────────── */

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();
  const allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) throw new Error("Invalid status.");
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
}
