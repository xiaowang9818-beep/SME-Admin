import { prisma } from "@/lib/prisma";
import { updateCustomer } from "./actions";
import { notFound } from "next/navigation";

export default async function CustomerEditPage({ params }: { params: { id: string } }) {
  const customer = await prisma.customer.findUnique({ where: { id: params.id } });
  if (!customer) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">编辑客户</h1>
      <form action={updateCustomer} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={customer.id} />
        <div>
          <label className="text-sm">客户名称 *</label>
          <input name="name" required defaultValue={customer.name} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">联系人</label>
          <input name="contact" defaultValue={customer.contact || ""} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">电话</label>
          <input name="phone" defaultValue={customer.phone || ""} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">级别</label>
          <select name="level" defaultValue={customer.level} className="mt-1 w-full rounded-lg border px-3 py-2">
            <option value="A">A 级</option>
            <option value="B">B 级</option>
            <option value="C">C 级</option>
          </select>
        </div>
        <div>
          <label className="text-sm">备注</label>
          <textarea name="remark" defaultValue={customer.remark || ""} className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/customers" className="rounded-lg border px-4 py-2 text-sm">返回</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">保存</button>
        </div>
      </form>
    </div>
  );
}
