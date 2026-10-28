import { prisma } from "@/lib/prisma";

export default async function FinancePage() {
  const sales = await prisma.salesOrder.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  const purchases = await prisma.purchaseOrder.findMany({
    include: { supplier: true },
    orderBy: { createdAt: "desc" },
  });

  const totalReceivable = sales.reduce((s, o) => s + (o.totalAmount - o.paidAmount), 0);
  const totalPayable = purchases.reduce((s, o) => s + (o.totalAmount - o.paidAmount), 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold">财务基础</h1>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-500">应收总额</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-600">¥{totalReceivable.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-slate-500">应付总额</div>
          <div className="mt-1 text-2xl font-semibold text-rose-600">¥{totalPayable.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">销售应收</h2>
        <div className="mt-2 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">订单号</th>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">应收</th>
                <th className="px-4 py-3">已收</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                  <td className="px-4 py-3">{o.customer.name}</td>
                  <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">¥{o.paidAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">{o.paymentStatus}</td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                    暂无销售订单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">采购应付</h2>
        <div className="mt-2 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">采购单号</th>
                <th className="px-4 py-3">供应商</th>
                <th className="px-4 py-3">应付</th>
                <th className="px-4 py-3">已付</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                  <td className="px-4 py-3">{o.supplier.name}</td>
                  <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">¥{o.paidAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">{o.paymentStatus}</td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                    暂无采购订单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
