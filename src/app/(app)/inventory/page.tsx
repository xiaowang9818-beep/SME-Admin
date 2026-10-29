import { prisma } from "@/lib/prisma";
import { adjustStock } from "./actions";

export default async function InventoryPage() {
  const items = await prisma.stockItem.findMany({
    include: { product: true, warehouse: true },
    orderBy: { updatedAt: "desc" },
  });

  const moves = await prisma.stockMove.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold text-slate-900">库存管理</h1>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">商品</th>
              <th className="px-4 py-3">仓库</th>
              <th className="px-4 py-3">当前库存</th>
              <th className="px-4 py-3">安全库存</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isLow = item.quantity < item.product.safetyStock;
              return (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.product.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.warehouse.name}</td>
                  <td className={`px-4 py-3 font-medium ${isLow ? "text-rose-600" : ""}`}>
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.product.safetyStock}</td>
                  <td className="px-4 py-3">
                    <form action={adjustStock} className="flex items-center gap-2">
                      <input type="hidden" name="stockItemId" value={item.id} />
                      <input
                        name="quantity"
                        type="number"
                        placeholder="调整数量"
                        className="w-24 rounded border border-slate-200 px-2 py-1 text-xs"
                      />
                      <button className="text-xs text-indigo-600 hover:text-indigo-700">调整</button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                  暂无库存
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">最近库存流水</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-3">时间</th>
                <th className="px-4 py-3">商品</th>
                <th className="px-4 py-3">类型</th>
                <th className="px-4 py-3">数量</th>
                <th className="px-4 py-3">备注</th>
              </tr>
            </thead>
            <tbody>
              {moves.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {m.createdAt.toLocaleString("zh-CN")}
                  </td>
                  <td className="px-4 py-3">{m.product.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        m.type === "IN"
                          ? "bg-emerald-50 text-emerald-700"
                          : m.type === "OUT"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {m.type === "IN" ? "入库" : m.type === "OUT" ? "出库" : "调整"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{m.quantity}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{m.remark || "-"}</td>
                </tr>
              ))}
              {moves.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                    暂无流水
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
