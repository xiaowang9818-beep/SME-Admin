export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">工作台</h1>
      <p className="mt-1 text-slate-500">通用企业管理系统 V1</p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "客户数", value: "1" },
          { label: "商品数", value: "1" },
          { label: "库存总量", value: "100" },
          { label: "待处理订单", value: "0" },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border bg-white p-4">
            <div className="text-sm text-slate-500">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
