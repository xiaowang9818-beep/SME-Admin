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
    <div className="flex min-h-screen">
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 transform border-r bg-white p-4 transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="text-lg font-semibold">通用企业管理系统</div>
          <button className="md:hidden text-sm" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <nav className="space-y-1">
          {menus.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t pt-4 text-sm">
          <div className="text-slate-500">{userName}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-2 text-xs text-rose-600"
          >
            退出登录
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center border-b bg-white px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} className="text-sm">
            菜单
          </button>
          <span className="ml-3 text-sm font-medium">通用企业管理系统</span>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
