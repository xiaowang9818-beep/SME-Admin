import { prisma } from "@/lib/prisma";
import { updateProduct } from "./actions";
import { notFound } from "next/navigation";

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">编辑商品</h1>
      <form action={updateProduct} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={product.id} />
        <div>
          <label className="text-sm">SKU</label>
          <input value={product.sku} disabled className="mt-1 w-full rounded-lg border bg-slate-50 px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">商品名称 *</label>
          <input name="name" required defaultValue={product.name} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">分类</label>
          <input name="category" defaultValue={product.category || ""} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">成本价</label>
            <input name="costPrice" type="number" step="0.01" defaultValue={product.costPrice} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">销售价</label>
            <input name="salePrice" type="number" step="0.01" defaultValue={product.salePrice} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/products" className="rounded-lg border px-4 py-2 text-sm">返回</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">保存</button>
        </div>
      </form>
    </div>
  );
}
