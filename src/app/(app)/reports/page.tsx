import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  const sales = await prisma.salesOrder.findMany({
    where: { status: { not: "CANCELLED" } },
    include: { customer: true, lines: { include: { product: true } } },
  });

  const productSales: Record<string, { name: string; qty: number; amount: number }> = {};
  for (const order of sales) {
    for (const line of order.lines) {
      const key = line.productId;
      if (!productSales[key]) {
        productSales[key] = { name: line.product.name, qty: 0, amount: 0 };
      }
      productSales[key].qty += line.quantity;
      productSales[key].amount += line.amount;
    }
  }

  const ranking = Object.values(productSales).sort((a, b) => b.amount - a.amount);

  const stockItems = await prisma.stockItem.findMany({
    include: { product: true, warehouse: true },
  });
  const lowStock = stockItems.filter((i) => i.quantity < i.product.safetyStock);

  return (
    <div>
      <h1 className="text-2xl font-semibold">简单报表</h1>

      <div className="mt-6">
        <h2 className="text-lg font-medium">商品销售排行</h2>
        <div className="mt-2 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">排名</th>
                <th className="px-4 py-3">商品</th>
                <th className="px-4 py-3">销量</th>
                <th className="px-4 py-3">金额</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((item, idx) => (
                <tr key={item.name} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.qty}</td>
                  <td className="px-4 py-3">¥{item.amount.toFixed(2)}</td>
                </tr>
              ))}
              {ranking.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                    暂无销售数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">低库存商品</h2>
        <div className="mt-2 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">商品</th>
                <th className="px-4 py-3">仓库</th>
                <th className="px-4 py-3">当前库存</th>
                <th className="px-4 py-3">安全库存</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.product.name}</td>
                  <td className="px-4 py-3">{item.warehouse.name}</td>
                  <td className="px-4 py-3 text-rose-600 font-medium">{item.quantity}</td>
                  <td className="px-4 py-3">{item.product.safetyStock}</td>
                </tr>
              ))}
              {lowStock.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                    暂无低库存商品
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
