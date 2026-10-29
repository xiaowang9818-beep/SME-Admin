import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [
    customerCount,
    productCount,
    orderCount,
    employeeCount,
    stockItems,
    recentOrders,
    announcements,
  ] = await Promise.all([
    prisma.customer.count(),
    prisma.product.count(),
    prisma.salesOrder.count({ where: { status: { not: "CANCELLED" } } }),
    prisma.employee.count(),
    prisma.stockItem.findMany({ include: { product: true } }),
    prisma.salesOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { customer: true },
    }),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  const totalStock = stockItems.reduce((s, i) => s + i.quantity, 0);
  const lowStockItems = stockItems.filter((i) => i.quantity < i.product.safetyStock);

  const unpaidOrders = await prisma.salesOrder.count({
    where: { paymentStatus: { not: "PAID" }, status: { not: "CANCELLED" } },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">工作台</h1>
        <p className="mt-1 text-sm text-slate-500">通用企业管理系统</p>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "客户数", value: customerCount, color: "text-blue-600" },
          { label: "商品数", value: productCount, color: "text-slate-900" },
          { label: "销售订单", value: orderCount, color: "text-emerald-600" },
          { label: "库存总量", value: totalStock, color: "text-indigo-600" },
          { label: "未收款订单", value: unpaidOrders, color: "text-amber-600" },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-medium text-slate-500">{card.label}</div>
            <div className={`mt-2 text-3xl font-bold ${card.color}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 低库存提醒 */}
      {lowStockItems.length > 0 && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-sm font-medium text-amber-800">低库存提醒 ({lowStockItems.length})</div>
          <div className="mt-2 space-y-1">
            {lowStockItems.slice(0, 3).map((item) => (
              <div key={item.id} className="text-xs text-amber-700">
                {item.product.name} — 当前 {item.quantity} / 安全 {item.product.safetyStock}
              </div>
            ))}
          </div>
          <Link href="/inventory" className="mt-2 inline-block text-xs text-amber-700 underline">
            查看库存
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* 最近订单 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-slate-900">最近销售订单</h2>
            <Link href="/sales" className="text-xs text-indigo-600 hover:text-indigo-700">
              查看全部
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-slate-900">{o.orderNo}</div>
                  <div className="text-xs text-slate-500">{o.customer.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">¥{o.totalAmount.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">{o.status}</div>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <div className="py-4 text-center text-sm text-slate-400">暂无订单</div>
            )}
          </div>
        </div>

        {/* 公告 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-slate-900">最新公告</h2>
            <Link href="/announcements" className="text-xs text-indigo-600 hover:text-indigo-700">
              查看全部
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {announcements.map((a) => (
              <div key={a.id}>
                <div className="text-sm font-medium text-slate-900">{a.title}</div>
                <div className="mt-0.5 text-xs text-slate-500 line-clamp-2">{a.content}</div>
              </div>
            ))}
            {announcements.length === 0 && (
              <div className="py-4 text-center text-sm text-slate-400">暂无公告</div>
            )}
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">快捷操作</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/sales/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
            新建销售订单
          </Link>
          <Link href="/purchases/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            新建采购订单
          </Link>
          <Link href="/customers/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            新建客户
          </Link>
          <Link href="/products/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            新建商品
          </Link>
        </div>
      </div>
    </div>
  );
}
