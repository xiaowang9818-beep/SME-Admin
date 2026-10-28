import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { stockItems: true },
  });

  const header = ["SKU", "名称", "分类", "规格", "成本价", "销售价", "库存", "安全库存"];
  const rows = products.map((p) => {
    const stock = p.stockItems.reduce((s, i) => s + i.quantity, 0);
    return [p.sku, p.name, p.category || "", p.spec || "", p.costPrice, p.salePrice, stock, p.safetyStock];
  });

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const bom = "\uFEFF";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="products.csv"`,
    },
  });
}
