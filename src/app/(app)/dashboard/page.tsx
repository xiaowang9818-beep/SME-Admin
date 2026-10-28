import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [customerCount, productCount, orderCount, employeeCount, stockItems, announcements] =
    await Promise.all([
      prisma.customer.count(),
      prisma.product.count(),
      prisma.salesOrder.count(),
      prisma.employee.count(),
      prisma.stockItem.findMany({ include: { product: true } }),
      prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    ]);

  const totalStock = stockItems.reduce((s, i) => s + i.quantity, 0);
  const lowStock = stockItems.filter((i) => i.quantity < i.product.safetyStock).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold">工作台</h1>
      <p className="mt-1 text-slate-500">通用企业管理系统</p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "客户数", value: customerCount },
          { label: "商品数", value: productCount },
          { label: "销售订单", value: orderCount },
          { label: "库存总量", value: totalStock },
          { label: "员工数", value: employeeCount },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border bg-white p-4">
            <div className="text-sm text-slate-500">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold">{card.value}</div>
          </div>
        ))}
      </div>

      {lowStock > 0 && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          有 {lowStock} 个商品低于安全库存，请及时补货
        </div>
      )}

      {announcements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium">最新公告</h2>
          <div className="mt-2 space-y-2">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-xl border bg-white p-3 text-sm">
                <div className="font-medium">{a.title}</div>
                <div className="mt-1 text-slate-500 line-clamp-2">{a.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
