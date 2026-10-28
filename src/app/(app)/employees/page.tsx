import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">员工管理</h1>
        <Link href="/employees/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          新建员工
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">姓名</th>
              <th className="px-4 py-3">部门</th>
              <th className="px-4 py-3">职位</th>
              <th className="px-4 py-3">电话</th>
              <th className="px-4 py-3">状态</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-3 font-medium">{e.name}</td>
                <td className="px-4 py-3">{e.department || "-"}</td>
                <td className="px-4 py-3">{e.position || "-"}</td>
                <td className="px-4 py-3">{e.phone || "-"}</td>
                <td className="px-4 py-3">{e.status === "ACTIVE" ? "在职" : "离职"}</td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  暂无员工
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
