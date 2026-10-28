export type MenuItem = {
  href: string;
  label: string;
  roles: string[];
};

export const MENUS: MenuItem[] = [
  { href: "/dashboard", label: "工作台", roles: ["BOSS", "SALES", "PURCHASE", "WAREHOUSE", "FINANCE", "HR"] },
  { href: "/customers", label: "客户", roles: ["BOSS", "SALES"] },
  { href: "/suppliers", label: "供应商", roles: ["BOSS", "PURCHASE"] },
  { href: "/products", label: "商品", roles: ["BOSS", "SALES", "PURCHASE", "WAREHOUSE"] },
  { href: "/sales", label: "销售订单", roles: ["BOSS", "SALES", "FINANCE"] },
  { href: "/purchases", label: "采购订单", roles: ["BOSS", "PURCHASE", "FINANCE"] },
  { href: "/inventory", label: "库存", roles: ["BOSS", "WAREHOUSE", "PURCHASE"] },
  { href: "/finance", label: "财务", roles: ["BOSS", "FINANCE"] },
  { href: "/employees", label: "员工", roles: ["BOSS", "HR"] },
  { href: "/announcements", label: "公告", roles: ["BOSS", "HR"] },
  { href: "/reports", label: "报表", roles: ["BOSS", "FINANCE"] },
  { href: "/logs", label: "操作日志", roles: ["BOSS"] },
];

export function getMenusForRole(role?: string | null) {
  if (!role) return MENUS.filter((m) => m.href === "/dashboard");
  if (role === "BOSS") return MENUS;
  return MENUS.filter((m) => m.roles.includes(role));
}
