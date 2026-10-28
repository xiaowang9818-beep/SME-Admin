"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCustomer(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  await prisma.customer.create({
    data: {
      name,
      contact: String(formData.get("contact") || "") || null,
      phone: String(formData.get("phone") || "") || null,
      email: String(formData.get("email") || "") || null,
      address: String(formData.get("address") || "") || null,
      level: (formData.get("level") as any) || "C",
      remark: String(formData.get("remark") || "") || null,
    },
  });

  redirect("/customers");
}
