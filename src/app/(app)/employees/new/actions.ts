"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createEmployee(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const hireDateStr = String(formData.get("hireDate") || "");

  await prisma.employee.create({
    data: {
      name,
      department: String(formData.get("department") || "") || null,
      position: String(formData.get("position") || "") || null,
      phone: String(formData.get("phone") || "") || null,
      hireDate: hireDateStr ? new Date(hireDateStr) : null,
      remark: String(formData.get("remark") || "") || null,
    },
  });

  redirect("/employees");
}
