"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  const hasLines =
    (await prisma.salesOrderLine.count({ where: { productId: id } })) +
    (await prisma.purchaseOrderLine.count({ where: { productId: id } }));
  if (hasLines > 0) return;

  await prisma.stockItem.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/inventory");
}
