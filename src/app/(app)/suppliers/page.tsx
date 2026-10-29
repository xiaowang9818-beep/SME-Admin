import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">供应商管理</h1>
        <Link href="/suppliers/new" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          新建供应商
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">供应商名称</th>
              <th className="px-4 py-3">联系人</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">地址</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 text-slate-600">{s.contact || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{s.phone || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{s.address || "-"}</td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400">暂无供应商</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
