"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSalesOrder(formData: FormData) {
  const customerId = String(formData.get("customerId") || "");
  const productId = String(formData.get("productId") || "");
  const quantity = Number(formData.get("quantity") || 0);
  if (!customerId || !productId || quantity <= 0) return;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return;

  const amount = product.salePrice * quantity;
  const orderNo = `SO-${Date.now().toString().slice(-8)}`;

  await prisma.salesOrder.create({
    data: {
      orderNo,
      customerId,
      orderDate: new Date(),
      totalAmount: amount,
      remark: String(formData.get("remark") || "") || null,
      lines: {
        create: {
          productId,
          quantity,
          price: product.salePrice,
          amount,
        },
      },
    },
  });

  redirect("/sales");
}
