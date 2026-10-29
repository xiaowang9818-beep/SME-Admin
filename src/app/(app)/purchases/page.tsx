import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { receivePurchase, markPurchasePaid } from "./actions";

export default async function PurchasesPage() {
  const orders = await prisma.purchaseOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { supplier: true },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">采购订单</h1>
        <Link href="/purchases/new" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          新建采购
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">采购单号</th>
              <th className="px-4 py-3">供应商</th>
              <th className="px-4 py-3">金额</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3">付款</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{o.orderNo}</td>
                <td className="px-4 py-3 text-slate-900">{o.supplier.name}</td>
                <td className="px-4 py-3 font-medium">¥{o.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{o.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${o.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {o.paymentStatus === "PAID" ? "已付款" : "未付款"}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-3">
                  {(o.status === "DRAFT" || o.status === "CONFIRMED") && (
                    <form action={receivePurchase} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-xs text-emerald-600 hover:text-emerald-700">入库</button>
                    </form>
                  )}
                  {o.paymentStatus !== "PAID" && (
                    <form action={markPurchasePaid} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-xs text-blue-600 hover:text-blue-700">标记已付款</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">暂无采购订单</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
