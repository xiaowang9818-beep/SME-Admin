import { createAnnouncement } from "./actions";

export default function NewAnnouncementPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">发布公告</h1>
      <form action={createAnnouncement} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">标题 *</label>
          <input name="title" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">内容 *</label>
          <textarea name="content" required className="mt-1 w-full rounded-lg border px-3 py-2" rows={6} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <a href="/announcements" className="rounded-lg border px-4 py-2 text-sm">取消</a>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">发布</button>
        </div>
      </form>
    </div>
  );
}
