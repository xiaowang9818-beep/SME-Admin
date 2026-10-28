import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { receivePurchase, markPurchasePaid } from "./actions";

export default async function PurchasesPage() {
  const orders = await prisma.purchaseOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { supplier: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">采购订单</h1>
        <Link href="/purchases/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建采购
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
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
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                <td className="px-4 py-3">{o.supplier.name}</td>
                <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">{o.status}</td>
                <td className="px-4 py-3">{o.paymentStatus}</td>
                <td className="px-4 py-3 space-x-2">
                  {(o.status === "DRAFT" || o.status === "CONFIRMED") && (
                    <form action={receivePurchase} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-blue-600 text-xs">入库</button>
                    </form>
                  )}
                  {o.paymentStatus !== "PAID" && (
                    <form action={markPurchasePaid} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-emerald-600 text-xs">标记已付款</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  暂无采购订单
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
