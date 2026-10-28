"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";

export async function createCustomer(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const customer = await prisma.customer.create({
    data: {
      name,
      contact: String(formData.get("contact") || "") || null,
      phone: String(formData.get("phone") || "") || null,
      email: String(formData.get("email") || "") || null,
      address: String(formData.get("address") || "") || null,
      level: (formData.get("level") as any) || "C",
      remark: String(formData.get("remark") || "") || null,
    },
  });

  await writeAudit({
    action: "创建客户",
    entity: "Customer",
    entityId: customer.id,
    userName: "系统",
  });

  redirect("/customers");
}
