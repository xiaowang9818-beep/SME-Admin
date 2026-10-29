import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { stockItems: true },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">商品管理</h1>
        <div className="flex gap-2">
          <a href="/api/export/products" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            导出 Excel
          </a>
          <Link href="/products/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            新建商品
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">名称</th>
              <th className="px-4 py-3">分类</th>
              <th className="px-4 py-3">售价</th>
              <th className="px-4 py-3">库存</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const stock = p.stockItems.reduce((s, i) => s + i.quantity, 0);
              const isLow = stock < p.safetyStock;
              return (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600">{p.category || "-"}</td>
                  <td className="px-4 py-3">¥{p.salePrice.toFixed(2)}</td>
                  <td className={`px-4 py-3 font-medium ${isLow ? "text-rose-600" : ""}`}>{stock}</td>
                  <td className="px-4 py-3 space-x-3">
                    <Link href={`/products/${p.id}`} className="text-xs text-indigo-600 hover:text-indigo-700">编辑</Link>
                    <form action={deleteProduct} className="inline">
                      <input type="hidden" name="id" value={p.id} />
                      <button className="text-xs text-rose-600 hover:text-rose-700">删除</button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">暂无商品</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
