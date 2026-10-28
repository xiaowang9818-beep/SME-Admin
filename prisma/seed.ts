import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const accounts = [
  { email: "boss@example.com", name: "老板", role: "BOSS", password: "Boss123456!" },
  { email: "sales@example.com", name: "销售", role: "SALES", password: "Sales123456!" },
  { email: "purchase@example.com", name: "采购", role: "PURCHASE", password: "Purchase123456!" },
  { email: "warehouse@example.com", name: "仓库", role: "WAREHOUSE", password: "Warehouse123456!" },
  { email: "finance@example.com", name: "财务", role: "FINANCE", password: "Finance123456!" },
  { email: "hr@example.com", name: "人事", role: "HR", password: "Hr123456!" },
];

async function main() {
  for (const acc of accounts) {
    const role = await prisma.role.upsert({
      where: { code: acc.role as any },
      update: {},
      create: { code: acc.role as any, name: acc.name },
    });

    const passwordHash = await bcrypt.hash(acc.password, 10);

    await prisma.user.upsert({
      where: { email: acc.email },
      update: { passwordHash },
      create: {
        email: acc.email,
        name: acc.name,
        passwordHash,
        roleId: role.id,
      },
    });
  }

  const warehouse = await prisma.warehouse.upsert({
    where: { id: "main-wh" },
    update: {},
    create: { id: "main-wh", name: "主仓库", location: "一楼" },
  });

  const product = await prisma.product.upsert({
    where: { sku: "P001" },
    update: {},
    create: {
      sku: "P001",
      name: "示例商品",
      category: "通用",
      unit: "件",
      costPrice: 50,
      salePrice: 80,
      safetyStock: 20,
    },
  });

  await prisma.stockItem.upsert({
    where: { productId_warehouseId: { productId: product.id, warehouseId: warehouse.id } },
    update: {},
    create: { productId: product.id, warehouseId: warehouse.id, quantity: 100 },
  });

  await prisma.customer.upsert({
    where: { id: "cust-1" },
    update: {},
    create: {
      id: "cust-1",
      name: "示例客户",
      contact: "张三",
      phone: "13800000000",
      level: "A",
    },
  });

  await prisma.supplier.upsert({
    where: { id: "sup-1" },
    update: {},
    create: {
      id: "sup-1",
      name: "示例供应商",
      contact: "李四",
      phone: "13900000000",
    },
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
