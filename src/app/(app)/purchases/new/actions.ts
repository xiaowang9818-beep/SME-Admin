"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createPurchaseOrder(formData: FormData) {
  const supplierId = String(formData.get("supplierId") || "");
  const productId = String(formData.get("productId") || "");
  const quantity = Number(formData.get("quantity") || 0);
  if (!supplierId || !productId || quantity <= 0) return;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return;

  const amount = product.costPrice * quantity;
  const orderNo = `PO-${Date.now().toString().slice(-8)}`;

  await prisma.purchaseOrder.create({
    data: {
      orderNo,
      supplierId,
      orderDate: new Date(),
      totalAmount: amount,
      remark: String(formData.get("remark") || "") || null,
      lines: {
        create: {
          productId,
          quantity,
          price: product.costPrice,
          amount,
        },
      },
    },
  });

  redirect("/purchases");
}
