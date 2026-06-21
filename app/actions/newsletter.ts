"use server";

import { prisma } from "@/lib/db";

export async function subscribeEmail(
  email: string
): Promise<{ ok: boolean; error?: string }> {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { ok: false, error: "Please enter a valid email." };
  }
  try {
    await prisma.subscriber.upsert({
      where: { email: clean },
      update: {},
      create: { email: clean },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
