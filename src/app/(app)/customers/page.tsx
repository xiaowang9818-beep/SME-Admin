import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCustomer } from "./actions";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">客户管理</h1>
        <div className="flex gap-2">
          <a href="/api/export/customers" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            导出 Excel
          </a>
          <Link href="/customers/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            新建客户
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">客户名称</th>
              <th className="px-4 py-3">联系人</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">级别</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 text-slate-600">{c.contact || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{c.phone || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    c.level === "A" ? "bg-blue-100 text-blue-700" :
                    c.level === "B" ? "bg-emerald-100 text-emerald-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>{c.level}</span>
                </td>
                <td className="px-4 py-3 space-x-3">
                  <Link href={`/customers/${c.id}`} className="text-xs text-blue-600 hover:text-blue-700">编辑</Link>
                  <form action={deleteCustomer} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="text-xs text-rose-600 hover:text-rose-700">删除</button>
                  </form>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">暂无客户</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
