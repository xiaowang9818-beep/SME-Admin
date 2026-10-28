import { signIn } from "@/auth";

const demoAccounts = [
  { email: "boss@example.com", password: "Boss123456!", label: "老板" },
  { email: "sales@example.com", password: "Sales123456!", label: "销售" },
  { email: "purchase@example.com", password: "Purchase123456!", label: "采购" },
  { email: "warehouse@example.com", password: "Warehouse123456!", label: "仓库" },
  { email: "finance@example.com", password: "Finance123456!", label: "财务" },
  { email: "hr@example.com", password: "Hr123456!", label: "人事" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">
            企
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">通用企业管理系统</h1>
          <p className="mt-1 text-sm text-slate-500">中小企业进销存管理平台</p>
        </div>

        <form
          className="mt-8 space-y-4"
          action={async (formData) => {
            "use server";
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/dashboard",
            });
          }}
        >
          <div>
            <label className="text-sm font-medium text-slate-700">邮箱</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              defaultValue="boss@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">密码</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              defaultValue="Boss123456!"
            />
          </div>
          <button className="mt-2 w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700">
            登录
          </button>
        </form>

        <div className="mt-8">
          <div className="text-center text-xs text-slate-400">演示账号（点击快速登录）</div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {demoAccounts.map((acc) => (
              <form
                key={acc.email}
                action={async () => {
                  "use server";
                  await signIn("credentials", {
                    email: acc.email,
                    password: acc.password,
                    redirectTo: "/dashboard",
                  });
                }}
              >
                <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                  {acc.label}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
