import { createCustomer } from "./actions";

export default function NewCustomerPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">新建客户</h1>
      <form action={createCustomer} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">客户名称 *</label>
          <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">联系人</label>
          <input name="contact" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">电话</label>
          <input name="phone" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">邮箱</label>
          <input name="email" type="email" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">地址</label>
          <input name="address" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">级别</label>
          <select name="level" className="mt-1 w-full rounded-lg border px-3 py-2">
            <option value="A">A 级</option>
            <option value="B">B 级</option>
            <option value="C">C 级</option>
          </select>
        </div>
        <div>
          <label className="text-sm">备注</label>
          <textarea name="remark" className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/customers" className="rounded-lg border px-4 py-2 text-sm">
            取消
          </a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">保存</button>
        </div>
      </form>
    </div>
  );
}
