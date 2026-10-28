"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateCustomer(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!id || !name) return;

  await prisma.customer.update({
    where: { id },
    data: {
      name,
      contact: String(formData.get("contact") || "") || null,
      phone: String(formData.get("phone") || "") || null,
      level: (formData.get("level") as any) || "C",
      remark: String(formData.get("remark") || "") || null,
    },
  });

  redirect("/customers");
}
