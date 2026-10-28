import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [customerCount, productCount, orderCount, employeeCount, stockItems, announcements] =
    await Promise.all([
      prisma.customer.count(),
      prisma.product.count(),
      prisma.salesOrder.count({ where: { status: { not: "CANCELLED" } } }),
      prisma.employee.count(),
      prisma.stockItem.findMany({ include: { product: true } }),
      prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    ]);

  const totalStock = stockItems.reduce((s, i) => s + i.quantity, 0);
  const lowStock = stockItems.filter((i) => i.quantity < i.product.safetyStock).length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">工作台</h1>
        <p className="mt-1 text-sm text-slate-500">通用企业管理系统</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "客户数", value: customerCount, accent: "text-blue-600" },
          { label: "商品数", value: productCount, accent: "text-slate-900" },
          { label: "销售订单", value: orderCount, accent: "text-emerald-600" },
          { label: "库存总量", value: totalStock, accent: "text-slate-900" },
          { label: "员工数", value: employeeCount, accent: "text-slate-900" },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-slate-500">{card.label}</div>
            <div className={`mt-2 text-2xl font-semibold ${card.accent}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {lowStock > 0 && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          有 {lowStock} 个商品低于安全库存，请及时补货
        </div>
      )}

      {announcements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-medium text-slate-900">最新公告</h2>
          <div className="mt-3 space-y-2">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-sm font-medium text-slate-900">{a.title}</div>
                <div className="mt-1 text-xs text-slate-500 line-clamp-2">{a.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
