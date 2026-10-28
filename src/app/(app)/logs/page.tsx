import { prisma } from "@/lib/prisma";

export default async function LogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">操作日志</h1>
      <p className="mt-1 text-sm text-slate-500">最近 200 条记录</p>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">时间</th>
              <th className="px-4 py-3">操作</th>
              <th className="px-4 py-3">对象</th>
              <th className="px-4 py-3">操作人</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4 py-3 text-xs text-slate-500">
                  {log.createdAt.toLocaleString("zh-CN")}
                </td>
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3">
                  {log.entity}
                  {log.entityId ? ` (${log.entityId.slice(0, 8)})` : ""}
                </td>
                <td className="px-4 py-3">{log.userName || "-"}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  暂无操作记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
