"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getMenusForRole } from "@/lib/menus";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const menus = getMenusForRole(role);
  const userName = session?.user?.name || "用户";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-slate-200 bg-white px-3 py-4 transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            企
          </div>
          <div className="text-sm font-semibold leading-tight text-slate-900">通用企业管理系统</div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {menus.map((m) => {
            const active = pathname === m.href || pathname.startsWith(m.href + "/");
            return (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-indigo-50 font-medium text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {m.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-slate-100 px-2 pt-3 text-sm">
          <div className="text-slate-700">{userName}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-1 text-xs text-rose-600 hover:text-rose-700"
          >
            退出登录
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} className="text-sm text-slate-700">
            菜单
          </button>
          <span className="ml-3 text-sm font-medium text-slate-900">通用企业管理系统</span>
        </header>
        <main className="flex-1 p-5 md:p-6">{children}</main>
      </div>
    </div>
  );
}
