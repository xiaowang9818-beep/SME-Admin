import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.salesOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  const header = ["订单号", "客户", "金额", "已收款", "状态", "收款状态", "下单日期"];
  const rows = orders.map((o) => [
    o.orderNo,
    o.customer.name,
    o.totalAmount,
    o.paidAmount,
    o.status,
    o.paymentStatus,
    o.orderDate.toISOString().slice(0, 10),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const bom = "\uFEFF";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sales.csv"`,
    },
  });
}
