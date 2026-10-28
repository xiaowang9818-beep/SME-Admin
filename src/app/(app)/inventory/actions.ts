"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adjustStock(formData: FormData) {
  const productId = String(formData.get("productId") || "");
  const warehouseId = String(formData.get("warehouseId") || "");
  const quantity = Number(formData.get("quantity") || 0);
  if (!productId || !warehouseId || quantity === 0) return;

  const existing = await prisma.stockItem.findUnique({
    where: { productId_warehouseId: { productId, warehouseId } },
  });

  if (existing) {
    await prisma.stockItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.stockItem.create({
      data: { productId, warehouseId, quantity: Math.max(0, quantity) },
    });
  }

  await prisma.stockMove.create({
    data: {
      productId,
      warehouseId,
      type: quantity > 0 ? "IN" : "OUT",
      quantity: Math.abs(quantity),
      remark: "手动调整",
    },
  });

  revalidatePath("/inventory");
}
