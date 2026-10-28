import { createEmployee } from "./actions";

export default function NewEmployeePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">新建员工</h1>
      <form action={createEmployee} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">姓名 *</label>
          <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">部门</label>
          <input name="department" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">职位</label>
          <input name="position" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">电话</label>
          <input name="phone" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">入职日期</label>
          <input name="hireDate" type="date" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">备注</label>
          <textarea name="remark" className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/employees" className="rounded-lg border px-4 py-2 text-sm">取消</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">保存</button>
        </div>
      </form>
    </div>
  );
}
