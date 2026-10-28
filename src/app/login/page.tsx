export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">通用企业管理系统</h1>
        <p className="mt-1 text-sm text-slate-500">中小企业进销存管理平台</p>
        <form className="mt-6 space-y-4" action="/api/auth/callback/credentials" method="post">
          <div>
            <label className="text-sm">邮箱</label>
            <input name="email" className="mt-1 w-full border-b py-2 outline-none" defaultValue="boss@example.com" />
          </div>
          <div>
            <label className="text-sm">密码</label>
            <input name="password" type="password" className="mt-1 w-full border-b py-2 outline-none" defaultValue="Boss123456!" />
          </div>
          <button className="mt-4 w-full rounded-full bg-black py-3 text-white">登录</button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">演示账号：boss@example.com / Boss123456!</p>
      </div>
    </div>
  );
}
