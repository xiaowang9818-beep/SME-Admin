import { createProduct } from "./actions";

export default function NewProductPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">新建商品</h1>
      <form action={createProduct} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">SKU *</label>
          <input name="sku" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">商品名称 *</label>
          <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">分类</label>
          <input name="category" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">规格</label>
          <input name="spec" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">成本价</label>
            <input name="costPrice" type="number" step="0.01" defaultValue="0" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">销售价</label>
            <input name="salePrice" type="number" step="0.01" defaultValue="0" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="text-sm">安全库存</label>
          <input name="safetyStock" type="number" defaultValue="0" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/products" className="rounded-lg border px-4 py-2 text-sm">取消</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">保存</button>
        </div>
      </form>
    </div>
  );
}
