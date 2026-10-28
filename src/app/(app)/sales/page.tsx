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
        <h1 className="text-2xl font-semibold">销售订单</h1>
        <Link href="/sales/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建订单
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
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
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                <td className="px-4 py-3">{o.customer.name}</td>
                <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">{o.status}</td>
                <td className="px-4 py-3">{o.paymentStatus}</td>
                <td className="px-4 py-3 space-x-2">
                  {(o.status === "DRAFT" || o.status === "CONFIRMED") && (
                    <>
                      <form action={shipOrder} className="inline">
                        <input type="hidden" name="orderId" value={o.id} />
                        <button className="text-blue-600 text-xs">发货</button>
                      </form>
                      <form action={cancelSalesOrder} className="inline">
                        <input type="hidden" name="orderId" value={o.id} />
                        <button className="text-rose-600 text-xs">作废</button>
                      </form>
                    </>
                  )}
                  {o.paymentStatus !== "PAID" && o.status !== "CANCELLED" && (
                    <form action={markSalesPaid} className="inline">
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="text-emerald-600 text-xs">标记已收款</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
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
