import { prisma } from "@/lib/prisma";
import { createSalesOrder } from "./actions";

export default async function NewSalesOrderPage() {
  const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">新建销售订单</h1>
      <form action={createSalesOrder} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">客户 *</label>
          <select name="customerId" required className="mt-1 w-full rounded-lg border px-3 py-2">
            <option value="">请选择</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">商品 *</label>
          <select name="productId" required className="mt-1 w-full rounded-lg border px-3 py-2">
            <option value="">请选择</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (¥{p.salePrice})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">数量 *</label>
          <input name="quantity" type="number" min="1" defaultValue="1" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">备注</label>
          <textarea name="remark" className="mt-1 w-full rounded-lg border px-3 py-2" rows={2} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/sales" className="rounded-lg border px-4 py-2 text-sm">取消</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">创建订单</button>
        </div>
      </form>
    </div>
  );
}
