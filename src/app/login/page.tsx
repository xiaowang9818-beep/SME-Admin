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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">通用企业管理系统</h1>
          <p className="mt-1 text-sm text-slate-500">中小企业进销存管理平台</p>
        </div>

        <form
          className="mt-6 space-y-4"
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
            <label className="text-sm text-slate-600">邮箱</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
              defaultValue="boss@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">密码</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
              defaultValue="Boss123456!"
            />
          </div>
          <button className="mt-2 w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:bg-slate-800">
            登录
          </button>
        </form>

        <div className="mt-6">
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
                <button className="rounded-full border px-3 py-1 text-xs hover:bg-slate-50">
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
