# 通用企业管理系统

面向中小企业的完整进销存 + 人事 + 财务基础管理系统。

## 启动

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

访问：http://127.0.0.1:3000

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 老板 | boss@example.com | Boss123456! |
| 销售 | sales@example.com | Sales123456! |
| 采购 | purchase@example.com | Purchase123456! |
| 仓库 | warehouse@example.com | Warehouse123456! |
| 财务 | finance@example.com | Finance123456! |
| 人事 | hr@example.com | Hr123456! |

登录页可直接点击对应角色快速登录。
