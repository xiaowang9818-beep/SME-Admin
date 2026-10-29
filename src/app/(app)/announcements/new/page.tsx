import { createAnnouncement } from "./actions";

export default function NewAnnouncementPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">发布公告</h1>
      <p className="mt-1 text-sm text-slate-500">填写公告内容</p>

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
            placeholder="公告内容"
            className="mt-1.5 min-h-[120px] w-full resize-y rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
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
