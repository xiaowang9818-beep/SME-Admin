"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

const menus = [
  { href: "/dashboard", label: "工作台" },
  { href: "/customers", label: "客户" },
  { href: "/suppliers", label: "供应商" },
  { href: "/products", label: "商品" },
  { href: "/sales", label: "销售订单" },
  { href: "/purchases", label: "采购订单" },
  { href: "/inventory", label: "库存" },
  { href: "/finance", label: "财务" },
  { href: "/employees", label: "员工" },
  { href: "/announcements", label: "公告" },
  { href: "/reports", label: "报表" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* 移动端遮罩 */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 侧边栏 */}
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
        <div className="mt-6 border-t pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-rose-600"
          >
            退出登录
          </button>
        </div>
      </aside>

      {/* 主内容 */}
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
