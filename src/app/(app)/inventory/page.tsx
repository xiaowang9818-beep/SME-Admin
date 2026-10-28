import { prisma } from "@/lib/prisma";
import { adjustStock } from "./actions";

export default async function InventoryPage() {
  const items = await prisma.stockItem.findMany({
    include: { product: true, warehouse: true },
    orderBy: { updatedAt: "desc" },
  });

  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  const warehouses = await prisma.warehouse.findMany();

  return (
    <div>
      <h1 className="text-2xl font-semibold">库存管理</h1>

      <div className="mt-4 rounded-2xl border bg-white p-4">
        <h2 className="text-sm font-medium">库存调整</h2>
        <form action={adjustStock} className="mt-3 flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs">商品</label>
            <select name="productId" className="mt-1 block rounded-lg border px-3 py-2 text-sm">
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs">仓库</label>
            <select name="warehouseId" className="mt-1 block rounded-lg border px-3 py-2 text-sm">
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs">数量（正入负出）</label>
            <input name="quantity" type="number" defaultValue="1" className="mt-1 block w-24 rounded-lg border px-3 py-2 text-sm" />
          </div>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">调整</button>
        </form>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">商品</th>
              <th className="px-4 py-3">仓库</th>
              <th className="px-4 py-3">数量</th>
              <th className="px-4 py-3">安全库存</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">{item.product.name}</td>
                <td className="px-4 py-3">{item.warehouse.name}</td>
                <td className="px-4 py-3 font-medium">{item.quantity}</td>
                <td className="px-4 py-3">{item.product.safetyStock}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  暂无库存记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
