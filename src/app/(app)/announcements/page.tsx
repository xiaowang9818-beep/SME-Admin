import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AnnouncementsPage() {
  const items = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">公告</h1>
        <Link href="/announcements/new" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          发布公告
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((a) => (
          <div key={a.id} className="rounded-2xl border bg-white p-4">
            <div className="font-medium">{a.title}</div>
            <div className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">{a.content}</div>
            <div className="mt-2 text-xs text-slate-400">
              {a.createdAt.toLocaleString("zh-CN")}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-400">
            暂无公告
          </div>
        )}
      </div>
    </div>
  );
}
