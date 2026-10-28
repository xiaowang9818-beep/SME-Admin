import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">客户管理</h1>
        <Link href="/customers/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建客户
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">客户名称</th>
              <th className="px-4 py-3">联系人</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">级别</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.contact || "-"}</td>
                <td className="px-4 py-3">{c.phone || "-"}</td>
                <td className="px-4 py-3">{c.level}</td>
                <td className="px-4 py-3">
                  <Link href={`/customers/${c.id}`} className="text-blue-600">
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  暂无客户，点击右上角新建
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
