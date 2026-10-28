"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getMenusForRole } from "@/lib/menus";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const role = (session?.user as any)?.role as string | undefined;
  const menus = getMenusForRole(role);
  const userName = session?.user?.name || "用户";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 transform border-r border-slate-200 bg-white p-5 transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            企
          </div>
          <div className="text-sm font-semibold text-slate-900">通用企业管理系统</div>
        </div>
        <nav className="space-y-0.5">
          {menus.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-slate-100 pt-4 text-sm">
          <div className="text-slate-500">{userName}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-2 text-xs text-rose-600 hover:text-rose-700"
          >
            退出登录
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} className="text-sm text-slate-700">
            菜单
          </button>
          <span className="ml-3 text-sm font-medium text-slate-900">通用企业管理系统</span>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
