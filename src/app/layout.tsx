import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "通用企业管理系统",
  description: "中小企业进销存与管理平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
