import { prisma } from "@/lib/prisma";
import { stockIn, stockOut } from "./actions";

export default async function InventoryPage() {
  const items = await prisma.stockItem.findMany({
    include: { product: true, warehouse: true },
    orderBy: { updatedAt: "desc" },
  });

  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  const warehouse = await prisma.warehouse.findFirst();

  const moves = await prisma.stockMove.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold text-slate-900">库存管理</h1>

      {/* 入库 / 出库表单 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <form action={stockIn} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-sm font-medium text-emerald-800">入库</div>
          <div className="mt-3 space-y-3">
            <select name="productId" required className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm">
              <option value="">选择商品</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input name="quantity" type="number" min="1" placeholder="入库数量" required className="w-full rounded-lg border border-emerald-200 px-3 py-2 text-sm" />
            <input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className="w-full rounded-lg border border-emerald-200 px-3 py-2 text-sm" />
            <input name="remark" placeholder="备注（可选）" className="w-full rounded-lg border border-emerald-200 px-3 py-2 text-sm" />
            <button className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              确认入库
            </button>
          </div>
        </form>

        <form action={stockOut} className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <div className="text-sm font-medium text-rose-800">出库</div>
          <div className="mt-3 space-y-3">
            <select name="productId" required className="w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm">
              <option value="">选择商品</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input name="quantity" type="number" min="1" placeholder="出库数量" required className="w-full rounded-lg border border-rose-200 px-3 py-2 text-sm" />
            <input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className="w-full rounded-lg border border-rose-200 px-3 py-2 text-sm" />
            <input name="remark" placeholder="备注（可选）" className="w-full rounded-lg border border-rose-200 px-3 py-2 text-sm" />
            <button className="w-full rounded-lg bg-rose-600 py-2 text-sm font-medium text-white hover:bg-rose-700">
              确认出库
            </button>
          </div>
        </form>
      </div>

      {/* 库存列表 */}
      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">当前库存</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-3">商品</th>
                <th className="px-4 py-3">仓库</th>
                <th className="px-4 py-3">当前库存</th>
                <th className="px-4 py-3">安全库存</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const isLow = item.quantity < item.product.safetyStock;
                return (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.product.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.warehouse.name}</td>
                    <td className={`px-4 py-3 font-semibold ${isLow ? "text-rose-600" : "text-slate-900"}`}>
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{item.product.safetyStock}</td>
                    <td className="px-4 py-3">
                      {isLow ? (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700">低库存</span>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">正常</span>
                      )}
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
      </div>

      {/* 流水 */}
      <div className="mt-6">
        <h2 className="text-base font-medium text-slate-900">库存流水</h2>
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
                          ? "bg-emerald-100 text-emerald-700"
                          : m.type === "OUT"
                          ? "bg-rose-100 text-rose-700"
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
