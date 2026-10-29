import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createAnnouncement } from "./actions";

export default async function NewAnnouncementPage() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "BOSS" && role !== "HR") redirect("/announcements");

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">发布公告</h1>
      <p className="mt-1 text-sm text-slate-500">发出后所有账号都能在公告里看到</p>

      <form action={createAnnouncement} className="mt-6 space-y-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
        <div>
          <label className="text-sm font-medium text-slate-700">标题 <span className="text-rose-500">*</span></label>
          <input name="title" required placeholder="公告标题" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">内容 <span className="text-rose-500">*</span></label>
          <textarea
            name="content"
            required
            placeholder="公告内容（可拖动右下角调整大小）"
            style={{ resize: "vertical", minHeight: "160px" }}
            className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/announcements" className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">
            取消
          </a>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            发布
          </button>
        </div>
      </form>
    </div>
  );
}
