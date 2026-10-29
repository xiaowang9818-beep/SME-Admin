"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function stockIn(formData: FormData) {
  const productId = String(formData.get("productId") || "");
  const quantity = parseInt(String(formData.get("quantity") || "0"), 10);
  const dateStr = String(formData.get("date") || "");
  const remark = String(formData.get("remark") || "");

  if (!productId || quantity <= 0) return;

  const warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) return;

  const existing = await prisma.stockItem.findUnique({
    where: { productId_warehouseId: { productId, warehouseId: warehouse.id } },
  });

  if (existing) {
    await prisma.stockItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.stockItem.create({
      data: { productId, warehouseId: warehouse.id, quantity },
    });
  }

  await prisma.stockMove.create({
    data: {
      productId,
      warehouseId: warehouse.id,
      type: "IN",
      quantity,
      remark: remark || `入库 ${dateStr}`,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}

export async function stockOut(formData: FormData) {
  const productId = String(formData.get("productId") || "");
  const quantity = parseInt(String(formData.get("quantity") || "0"), 10);
  const dateStr = String(formData.get("date") || "");
  const remark = String(formData.get("remark") || "");

  if (!productId || quantity <= 0) return;

  const warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) return;

  const existing = await prisma.stockItem.findUnique({
    where: { productId_warehouseId: { productId, warehouseId: warehouse.id } },
  });

  if (!existing || existing.quantity < quantity) return;

  await prisma.stockItem.update({
    where: { id: existing.id },
    data: { quantity: existing.quantity - quantity },
  });

  await prisma.stockMove.create({
    data: {
      productId,
      warehouseId: warehouse.id,
      type: "OUT",
      quantity,
      remark: remark || `出库 ${dateStr}`,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}
