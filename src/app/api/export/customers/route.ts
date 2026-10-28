import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const customers = await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });

  const header = ["客户名称", "联系人", "电话", "邮箱", "地址", "级别", "备注"];
  const rows = customers.map((c) => [
    c.name,
    c.contact || "",
    c.phone || "",
    c.email || "",
    c.address || "",
    c.level,
    c.remark || "",
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const bom = "\uFEFF";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="customers.csv"`,
    },
  });
}
