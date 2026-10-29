"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adjustStock(formData: FormData) {
  const stockItemId = String(formData.get("stockItemId") || "");
  const qtyStr = String(formData.get("quantity") || "");
  const quantity = parseInt(qtyStr, 10);

  if (!stockItemId || isNaN(quantity)) return;

  const item = await prisma.stockItem.findUnique({
    where: { id: stockItemId },
    include: { product: true },
  });
  if (!item) return;

  const diff = quantity - item.quantity;

  await prisma.stockItem.update({
    where: { id: stockItemId },
    data: { quantity },
  });

  if (diff !== 0) {
    await prisma.stockMove.create({
      data: {
        productId: item.productId,
        warehouseId: item.warehouseId,
        type: "ADJUST",
        quantity: Math.abs(diff),
        remark: `手动调整 ${item.quantity} → ${quantity}`,
      },
    });
  }

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}
