"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!id || !name) return;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      category: String(formData.get("category") || "") || null,
      costPrice: Number(formData.get("costPrice") || 0),
      salePrice: Number(formData.get("salePrice") || 0),
    },
  });

  redirect("/products");
}
