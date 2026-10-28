"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const sku = String(formData.get("sku") || "").trim();
  const name = String(formData.get("name") || "").trim();
  if (!sku || !name) return;

  await prisma.product.create({
    data: {
      sku,
      name,
      category: String(formData.get("category") || "") || null,
      spec: String(formData.get("spec") || "") || null,
      costPrice: Number(formData.get("costPrice") || 0),
      salePrice: Number(formData.get("salePrice") || 0),
      safetyStock: Number(formData.get("safetyStock") || 0),
    },
  });

  redirect("/products");
}
