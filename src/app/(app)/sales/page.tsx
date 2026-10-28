import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { shipOrder, markSalesPaid, cancelSalesOrder } from "./actions";

export default async function SalesPage() {
  const orders = await prisma.salesOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">销售订单</h1>
        <div className="flex gap-2">
          <a href="/api/export/sales" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            导出 Excel
          </a>
          <Link href="/sales/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            新建订单
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">订单号</th>
              <th className="px-4 py-3">客户</th>
              <th className="px-4 py-3">金额</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3">收款</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{o.orderNo}</td>
                <td className="px-4 py-3 text-slate-900">{o.customer.name}</td>
                <td className="px-4 py-3 font-medium">¥{o.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{o.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${o.paymentStatus === "PAID" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-3">
                  {(o.status === "DRAFT" || o.status === "CONFIRMED") && (
                    <>
                      <form action={shipOrder} className="inline">
                        <input type="hidden" name="orderId" value={o.id} />
                        <button className="text-xs text-blue-600 hover:text-blue-700">发货</button>
                      </form>
                      <form action={cancelSalesOrder} className="inline">
                        <input type="hidden" name="orderId" value={o.id} />
                        <button className="text-xs text-rose-600 hover:text-rose-700">作废</button>
                      </form>
                    </>
                  )}
                  {o.paymentStatus !== "PAID" && o.status !== "CANCELLED" && (
                    <form action={markSalesPaid} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-xs text-emerald-600 hover:text-emerald-700">标记已收款</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                  暂无销售订单
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
