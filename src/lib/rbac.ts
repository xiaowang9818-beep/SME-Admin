export const PERMISSIONS = [
  { code: "*", name: "全部权限", module: "system" },
  { code: "dashboard.read", name: "工作台", module: "dashboard" },
  { code: "customer.read", name: "客户", module: "crm" },
  { code: "sales.write", name: "销售", module: "sales" },
  { code: "purchase.write", name: "采购", module: "purchase" },
  { code: "inventory.write", name: "库存", module: "inventory" },
  { code: "finance.write", name: "财务", module: "finance" },
  { code: "hr.write", name: "人事", module: "hr" },
  { code: "admin.write", name: "系统管理", module: "system" },
] as const;

export const STAFF_ACCOUNTS = [
  { email: "boss@example.com", name: "老板", role: "BOSS", password: "Boss123456!" },
] as const;
