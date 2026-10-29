import { createEmployee } from "./actions";

export default function NewEmployeePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">新建员工</h1>
      <p className="mt-1 text-sm text-slate-500">填写员工基本信息</p>

      <form action={createEmployee} className="mt-6 space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div>
          <label className="text-sm font-medium text-amber-800">姓名 <span className="text-rose-500">*</span></label>
          <input name="name" required placeholder="请输入姓名" className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-amber-800">部门</label>
            <input name="department" placeholder="如：销售部" className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-amber-800">职位</label>
            <input name="position" placeholder="如：销售经理" className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-amber-800">电话</label>
            <input name="phone" placeholder="联系电话" className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-amber-800">入职日期</label>
            <input name="hireDate" type="date" className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-amber-800">备注</label>
          <textarea name="remark" rows={3} placeholder="可选" className="mt-1.5 min-h-[80px] w-full resize-y rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/employees" className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">取消</a>
          <button className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600">保存</button>
        </div>
      </form>
    </div>
  );
}
