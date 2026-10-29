import { createProduct } from "./actions";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">新建商品</h1>
      <p className="mt-1 text-sm text-slate-500">填写商品基本信息</p>

      <form action={createProduct} className="mt-6 space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-indigo-800">SKU <span className="text-rose-500">*</span></label>
            <input name="sku" required placeholder="商品编码" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-indigo-800">商品名称 <span className="text-rose-500">*</span></label>
            <input name="name" required placeholder="商品名称" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-indigo-800">分类</label>
            <input name="category" placeholder="如：电子产品" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-indigo-800">规格</label>
            <input name="spec" placeholder="规格说明" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-indigo-800">成本价</label>
            <input name="costPrice" type="number" step="0.01" defaultValue="0" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-indigo-800">销售价</label>
            <input name="salePrice" type="number" step="0.01" defaultValue="0" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-indigo-800">安全库存</label>
          <input name="safetyStock" type="number" defaultValue="0" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/products" className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">取消</a>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">保存</button>
        </div>
      </form>
    </div>
  );
}
