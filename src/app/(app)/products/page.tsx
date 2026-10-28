import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { stockItems: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">商品管理</h1>
        <Link href="/products/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建商品
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
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
              return (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.category || "-"}</td>
                  <td className="px-4 py-3">¥{p.salePrice.toFixed(2)}</td>
                  <td className="px-4 py-3">{stock}</td>
                  <td className="px-4 py-3">
                    <Link href={`/products/${p.id}`} className="text-blue-600">
                      编辑
                    </Link>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  暂无商品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
