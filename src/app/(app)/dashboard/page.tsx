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

  const cards = [
    { label: "客户数", value: customerCount, color: "from-blue-500 to-blue-600" },
    { label: "商品数", value: productCount, color: "from-slate-500 to-slate-600" },
    { label: "销售订单", value: orderCount, color: "from-emerald-500 to-emerald-600" },
    { label: "库存总量", value: totalStock, color: "from-indigo-500 to-indigo-600" },
    { label: "员工数", value: employeeCount, color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">工作台</h1>
        <p className="mt-1 text-sm text-slate-500">通用企业管理系统</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-slate-500">{card.label}</div>
            <div className={`mt-3 bg-gradient-to-r ${card.color} bg-clip-text text-3xl font-bold text-transparent`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {lowStock > 0 && (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
          有 {lowStock} 个商品低于安全库存，请及时补货
        </div>
      )}

      {announcements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-medium text-slate-900">最新公告</h2>
          <div className="mt-3 space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">{a.title}</div>
                  <div className="text-xs text-slate-400">
                    {a.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                </div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{a.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
