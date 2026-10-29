import { createCustomer } from "./actions";

export default function NewCustomerPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">新建客户</h1>
      <p className="mt-1 text-sm text-slate-500">填写客户基本信息</p>

      <form action={createCustomer} className="mt-6 space-y-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <div>
          <label className="text-sm font-medium text-blue-800">客户名称 <span className="text-rose-500">*</span></label>
          <input name="name" required placeholder="请输入客户名称" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-blue-800">联系人</label>
            <input name="contact" placeholder="联系人姓名" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-800">电话</label>
            <input name="phone" placeholder="联系电话" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-blue-800">邮箱</label>
          <input name="email" type="email" placeholder="邮箱地址" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-800">地址</label>
          <input name="address" placeholder="详细地址" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-800">级别</label>
          <select name="level" className="mt-1.5 w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none">
            <option value="A">A 级</option>
            <option value="B">B 级</option>
            <option value="C">C 级</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-blue-800">备注</label>
          <textarea name="remark" rows={3} placeholder="可选" className="mt-1.5 min-h-[80px] w-full resize-y rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/customers" className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">取消</a>
          <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">保存</button>
        </div>
      </form>
    </div>
  );
}
