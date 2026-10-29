import { createCustomer } from "./actions";

export default function NewCustomerPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">新建客户</h1>
      <p className="mt-1 text-sm text-slate-500">填写客户基本信息</p>

      <form action={createCustomer} className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium text-slate-700">客户名称 <span className="text-rose-500">*</span></label>
          <input name="name" required placeholder="请输入客户名称" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">联系人</label>
            <input name="contact" placeholder="联系人姓名" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">电话</label>
            <input name="phone" placeholder="联系电话" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">邮箱</label>
          <input name="email" type="email" placeholder="邮箱地址" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">地址</label>
          <input name="address" placeholder="详细地址" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">级别</label>
          <select name="level" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
            <option value="A">A 级</option>
            <option value="B">B 级</option>
            <option value="C">C 级</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">备注</label>
          <textarea name="remark" rows={3} placeholder="可选" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <a href="/customers" className="rounded-lg border border-slate-200 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">
            取消
          </a>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
