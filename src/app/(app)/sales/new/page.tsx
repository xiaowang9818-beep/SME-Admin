import { prisma } from "@/lib/prisma";
import { createSalesOrder } from "./actions";

export default async function NewSalesOrderPage() {
  const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">新建销售订单</h1>
      <p className="mt-1 text-sm text-slate-500">选择客户和商品</p>

      <form action={createSalesOrder} className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium text-slate-700">客户 <span className="text-rose-500">*</span></label>
          <select name="customerId" required className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
            <option value="">请选择</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">商品 <span className="text-rose-500">*</span></label>
          <select name="productId" required className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
            <option value="">请选择</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (¥{p.salePrice})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">数量 <span className="text-rose-500">*</span></label>
          <input name="quantity" type="number" min="1" defaultValue="1" required className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">备注</label>
          <textarea name="remark" rows={3} placeholder="可选" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <a href="/sales" className="rounded-lg border border-slate-200 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">
            取消
          </a>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            创建订单
          </button>
        </div>
      </form>
    </div>
  );
}
