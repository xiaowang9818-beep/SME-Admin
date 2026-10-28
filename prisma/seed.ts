import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Boss123456!", 10);

  const bossRole = await prisma.role.upsert({
    where: { code: "BOSS" },
    update: {},
    create: { code: "BOSS", name: "老板", description: "全部权限" },
  });

  await prisma.user.upsert({
    where: { email: "boss@example.com" },
    update: {},
    create: {
      email: "boss@example.com",
      name: "老板",
      passwordHash,
      roleId: bossRole.id,
    },
  });

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

  const customer = await prisma.customer.upsert({
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

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
