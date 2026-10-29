import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">员工管理</h1>
        <Link href="/employees/new" className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
          新建员工
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">姓名</th>
              <th className="px-4 py-3">部门</th>
              <th className="px-4 py-3">职位</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">状态</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{e.name}</td>
                <td className="px-4 py-3 text-slate-600">{e.department || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{e.position || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{e.phone || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${e.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {e.status === "ACTIVE" ? "在职" : "离职"}
                  </span>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">暂无员工</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
