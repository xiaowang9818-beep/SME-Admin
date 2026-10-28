"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeAudit } from "@/lib/audit";

export async function shipOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) return;

  const order = await prisma.salesOrder.findUnique({
    where: { id: orderId },
    include: { lines: true },
  });
  if (!order || order.status === "SHIPPED" || order.status === "COMPLETED" || order.status === "CANCELLED") return;

  const warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) return;

  for (const line of order.lines) {
    const stock = await prisma.stockItem.findUnique({
      where: {
        productId_warehouseId: { productId: line.productId, warehouseId: warehouse.id },
      },
    });

    if (!stock || stock.quantity < line.quantity) continue;

    await prisma.stockItem.update({
      where: { id: stock.id },
      data: { quantity: stock.quantity - line.quantity },
    });

    await prisma.stockMove.create({
      data: {
        productId: line.productId,
        warehouseId: warehouse.id,
        type: "OUT",
        quantity: line.quantity,
        refType: "SALES",
        refId: orderId,
        remark: `销售发货 ${order.orderNo}`,
      },
    });
  }

  await prisma.salesOrder.update({
    where: { id: orderId },
    data: { status: "SHIPPED" },
  });

  await writeAudit({
    action: "销售发货",
    entity: "SalesOrder",
    entityId: orderId,
    userName: "系统",
  });

  revalidatePath("/sales");
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}

export async function markSalesPaid(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) return;

  const order = await prisma.salesOrder.findUnique({ where: { id: orderId } });
  if (!order) return;

  await prisma.salesOrder.update({
    where: { id: orderId },
    data: {
      paidAmount: order.totalAmount,
      paymentStatus: "PAID",
    },
  });

  await writeAudit({
    action: "标记已收款",
    entity: "SalesOrder",
    entityId: orderId,
    userName: "系统",
  });

  revalidatePath("/sales");
  revalidatePath("/finance");
}

export async function cancelSalesOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) return;

  await prisma.salesOrder.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });

  await writeAudit({
    action: "作废销售订单",
    entity: "SalesOrder",
    entityId: orderId,
    userName: "系统",
  });

  revalidatePath("/sales");
}
