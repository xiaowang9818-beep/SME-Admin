"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSupplier(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  await prisma.supplier.create({
    data: {
      name,
      contact: String(formData.get("contact") || "") || null,
      phone: String(formData.get("phone") || "") || null,
      address: String(formData.get("address") || "") || null,
      remark: String(formData.get("remark") || "") || null,
    },
  });

  redirect("/suppliers");
}
