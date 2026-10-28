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

演示账号：boss@example.com / Boss123456!
