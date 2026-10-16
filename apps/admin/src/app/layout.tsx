import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "知瑜 · 运营管理",
  description: "知瑜资源、客户与访问数据管理",
  icons: { icon: "/images/zhiyu-logo.png" },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
