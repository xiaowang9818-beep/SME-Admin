import Link from "next/link";
import { auth, signOut } from "@/auth";

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

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userName = session?.user?.name || "用户";

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-white p-4 flex flex-col">
        <div className="mb-6 text-lg font-semibold">通用企业管理系统</div>
        <nav className="space-y-1 flex-1">
          {menus.map((m) => (
            <Link key={m.href} href={m.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 border-t pt-4 text-sm">
          <div className="text-slate-500">{userName}</div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="mt-2 text-xs text-rose-600">退出登录</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
