import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getStockLevel } from "@/lib/stock";

const salesStatusLabel: Record<string, string> = {
  DRAFT: "待确认",
  CONFIRMED: "待发货",
  PARTIAL_SHIPPED: "部分发货",
  SHIPPED: "已发货",
  COMPLETED: "已完成",
  CANCELLED: "已作废",
};

const purchaseStatusLabel: Record<string, string> = {
  DRAFT: "待确认",
  CONFIRMED: "待入库",
  PARTIAL_RECEIVED: "部分入库",
  RECEIVED: "已入库",
  COMPLETED: "已完成",
  CANCELLED: "已作废",
};

function money(n: number) {
  return `¥${n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default async function DashboardPage() {
  const [openSales, openPurchases, stockItems, unpaidSales, latestAnnouncement] = await Promise.all([
    prisma.salesOrder.findMany({
      where: { status: { in: ["DRAFT", "CONFIRMED", "PARTIAL_SHIPPED"] } },
      include: { customer: true },
      orderBy: { orderDate: "asc" },
      take: 8,
    }),
    prisma.purchaseOrder.findMany({
      where: { status: { in: ["DRAFT", "CONFIRMED", "PARTIAL_RECEIVED"] } },
      include: { supplier: true },
      orderBy: { orderDate: "asc" },
      take: 8,
    }),
    prisma.stockItem.findMany({ include: { product: true } }),
    prisma.salesOrder.findMany({
      where: { paymentStatus: { not: "PAID" }, status: { not: "CANCELLED" } },
      include: { customer: true },
      orderBy: { orderDate: "asc" },
    }),
    prisma.announcement.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const alerts = stockItems
    .map((item) => ({
      ...item,
      level: getStockLevel(item.quantity, item.product.safetyStock),
    }))
    .filter((item) => item.level !== "NORMAL")
    .sort((a, b) => (a.level === "CRITICAL" ? -1 : 1));

  const receivable = unpaidSales.reduce((sum, order) => sum + (order.totalAmount - order.paidAmount), 0);
  const salesOpenCount = await prisma.salesOrder.count({
    where: { status: { in: ["DRAFT", "CONFIRMED", "PARTIAL_SHIPPED"] } },
  });
  const purchaseOpenCount = await prisma.purchaseOrder.count({
    where: { status: { in: ["DRAFT", "CONFIRMED", "PARTIAL_RECEIVED"] } },
  });

  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const todoCount = salesOpenCount + purchaseOpenCount + alerts.length + (receivable > 0 ? 1 : 0);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">工作台</h1>
          <p className="mt-1 text-sm text-slate-500">
            {todoCount > 0 ? `今天有 ${todoCount} 件事要处理` : "今天没有待处理事项"}
          </p>
        </div>
        <div className="text-sm text-slate-400">{today}</div>
      </div>

      {latestAnnouncement && (
        <Link href="/announcements" className="mt-5 block rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4 hover:bg-indigo-100/70">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-indigo-700">最新公告</div>
            <div className="text-xs text-indigo-400">{latestAnnouncement.createdAt.toLocaleString("zh-CN")}</div>
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900">{latestAnnouncement.title}</div>
          <div className="mt-1 line-clamp-2 text-sm text-slate-600">{latestAnnouncement.content}</div>
        </Link>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Link href="/sales" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-200">
          <div className="text-xs text-slate-500">待发货</div>
          <div className="mt-2 text-3xl font-semibold text-indigo-600">{salesOpenCount}</div>
          <div className="mt-1 text-xs text-slate-400">销售订单还没出去</div>
        </Link>
        <Link href="/purchases" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-200">
          <div className="text-xs text-slate-500">待入库</div>
          <div className="mt-2 text-3xl font-semibold text-emerald-600">{purchaseOpenCount}</div>
          <div className="mt-1 text-xs text-slate-400">采购还没回来</div>
        </Link>
        <Link href="/inventory" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-rose-200">
          <div className="text-xs text-slate-500">库存预警</div>
          <div className={`mt-2 text-3xl font-semibold ${alerts.length ? "text-rose-600" : "text-slate-900"}`}>
            {alerts.length}
          </div>
          <div className="mt-1 text-xs text-slate-400">低于安全库存</div>
        </Link>
        <Link href="/finance" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200">
          <div className="text-xs text-slate-500">应收未收</div>
          <div className={`mt-2 text-3xl font-semibold ${receivable > 0 ? "text-amber-600" : "text-slate-900"}`}>
            {money(receivable)}
          </div>
          <div className="mt-1 text-xs text-slate-400">{unpaidSales.length} 张单还没收齐</div>
        </Link>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-3 text-sm font-medium text-slate-900">先看这些</div>
        <div className="divide-y divide-slate-100">
          {alerts.slice(0, 3).map((item) => (
            <Link key={item.id} href="/inventory" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
              <span className={`h-2 w-2 shrink-0 rounded-full ${item.level === "CRITICAL" ? "bg-rose-500" : "bg-amber-500"}`} />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-slate-900">{item.product.name}</div>
                <div className="text-xs text-slate-500">
                  库存 {item.quantity} · 安全库存 {item.product.safetyStock}
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs ${item.level === "CRITICAL" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>
                {item.level === "CRITICAL" ? "严重不足" : "低库存"}
              </span>
            </Link>
          ))}
          {openSales.slice(0, 3).map((order) => (
            <Link key={order.id} href="/sales" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
              <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-slate-900">
                  {order.orderNo}
                  <span className="ml-2 text-slate-500">{order.customer.name}</span>
                </div>
                <div className="text-xs text-slate-500">销售 {money(order.totalAmount)}</div>
              </div>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                {salesStatusLabel[order.status] || order.status}
              </span>
            </Link>
          ))}
          {openPurchases.slice(0, 3).map((order) => (
            <Link key={order.id} href="/purchases" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-slate-900">
                  {order.orderNo}
                  <span className="ml-2 text-slate-500">{order.supplier.name}</span>
                </div>
                <div className="text-xs text-slate-500">采购 {money(order.totalAmount)}</div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                {purchaseStatusLabel[order.status] || order.status}
              </span>
            </Link>
          ))}
          {todoCount === 0 && (
            <div className="px-5 py-8 text-center text-sm text-slate-400">没有待发货、待入库、库存预警或未收款</div>
          )}
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h2 className="text-sm font-medium text-slate-900">未发货订单</h2>
            <Link href="/sales" className="text-xs text-indigo-600">全部</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {openSales.length === 0 && <div className="px-5 py-6 text-sm text-slate-400">没有待发货</div>}
            {openSales.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <div className="font-medium text-slate-900">{order.customer.name}</div>
                  <div className="text-xs text-slate-400">{order.orderNo}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-900">{money(order.totalAmount)}</div>
                  <div className="text-xs text-slate-400">{salesStatusLabel[order.status]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h2 className="text-sm font-medium text-slate-900">未入库采购</h2>
            <Link href="/purchases" className="text-xs text-indigo-600">全部</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {openPurchases.length === 0 && <div className="px-5 py-6 text-sm text-slate-400">没有待入库</div>}
            {openPurchases.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <div className="font-medium text-slate-900">{order.supplier.name}</div>
                  <div className="text-xs text-slate-400">{order.orderNo}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-900">{money(order.totalAmount)}</div>
                  <div className="text-xs text-slate-400">{purchaseStatusLabel[order.status]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
