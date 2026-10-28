"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function receivePurchase(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) return;

  const order = await prisma.purchaseOrder.findUnique({
    where: { id: orderId },
    include: { lines: true },
  });
  if (!order || order.status === "RECEIVED" || order.status === "COMPLETED") return;

  const warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) return;

  for (const line of order.lines) {
    const existing = await prisma.stockItem.findUnique({
      where: {
        productId_warehouseId: { productId: line.productId, warehouseId: warehouse.id },
      },
    });

    if (existing) {
      await prisma.stockItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + line.quantity },
      });
    } else {
      await prisma.stockItem.create({
        data: {
          productId: line.productId,
          warehouseId: warehouse.id,
          quantity: line.quantity,
        },
      });
    }

    await prisma.stockMove.create({
      data: {
        productId: line.productId,
        warehouseId: warehouse.id,
        type: "IN",
        quantity: line.quantity,
        refType: "PURCHASE",
        refId: orderId,
        remark: `采购入库 ${order.orderNo}`,
      },
    });
  }

  await prisma.purchaseOrder.update({
    where: { id: orderId },
    data: { status: "RECEIVED" },
  });

  revalidatePath("/purchases");
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}

export async function markPurchasePaid(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) return;

  const order = await prisma.purchaseOrder.findUnique({ where: { id: orderId } });
  if (!order) return;

  await prisma.purchaseOrder.update({
    where: { id: orderId },
    data: {
      paidAmount: order.totalAmount,
      paymentStatus: "PAID",
    },
  });

  revalidatePath("/purchases");
  revalidatePath("/finance");
}
