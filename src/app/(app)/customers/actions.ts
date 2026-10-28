"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCustomer(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  const hasOrders = await prisma.salesOrder.count({ where: { customerId: id } });
  if (hasOrders > 0) return;

  await prisma.customer.delete({ where: { id } });
  revalidatePath("/customers");
}
