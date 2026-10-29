import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AnnouncementsPage() {
  const items = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">公告</h1>
        <Link href="/announcements/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          发布公告
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="text-base font-medium text-slate-900">{a.title}</div>
              <div className="text-xs text-slate-400">
                {a.createdAt.toLocaleString("zh-CN")}
              </div>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {a.content}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
            暂无公告
          </div>
        )}
      </div>
    </div>
  );
}
