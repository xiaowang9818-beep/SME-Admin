import { prisma } from "@/lib/prisma";

export default async function FinancePage() {
  const sales = await prisma.salesOrder.findMany({
    where: { status: { not: "CANCELLED" } },
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  const purchases = await prisma.purchaseOrder.findMany({
    include: { supplier: true },
    orderBy: { createdAt: "desc" },
  });

  const receivable = sales.reduce((s, o) => s + (o.totalAmount - o.paidAmount), 0);
  const payable = purchases.reduce((s, o) => s + (o.totalAmount - o.paidAmount), 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold text-slate-900">财务</h1>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-xs font-medium text-emerald-700">应收款</div>
          <div className="mt-2 text-3xl font-bold text-emerald-600">¥{receivable.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <div className="text-xs font-medium text-rose-700">应付款</div>
          <div className="mt-2 text-3xl font-bold text-rose-600">¥{payable.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">销售订单（应收）</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-3">订单号</th>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">金额</th>
                <th className="px-4 py-3">已收</th>
                <th className="px-4 py-3">未收</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                  <td className="px-4 py-3">{o.customer.name}</td>
                  <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-emerald-600">¥{o.paidAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 font-medium text-amber-600">¥{(o.totalAmount - o.paidAmount).toFixed(2)}</td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">暂无数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">采购订单（应付）</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-3">采购单号</th>
                <th className="px-4 py-3">供应商</th>
                <th className="px-4 py-3">金额</th>
                <th className="px-4 py-3">已付</th>
                <th className="px-4 py-3">未付</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{o.orderNo}</td>
                  <td className="px-4 py-3">{o.supplier.name}</td>
                  <td className="px-4 py-3">¥{o.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-emerald-600">¥{o.paidAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 font-medium text-rose-600">¥{(o.totalAmount - o.paidAmount).toFixed(2)}</td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">暂无数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
