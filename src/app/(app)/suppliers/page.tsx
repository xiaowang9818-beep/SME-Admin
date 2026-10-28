import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">供应商管理</h1>
        <Link href="/suppliers/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建供应商
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">供应商名称</th>
              <th className="px-4 py-3">联系人</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">地址</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.contact || "-"}</td>
                <td className="px-4 py-3">{s.phone || "-"}</td>
                <td className="px-4 py-3">{s.address || "-"}</td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  暂无供应商
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
