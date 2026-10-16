import { redirect } from "next/navigation";
import { currentUser } from "@/lib/server";
import { Shell } from "@/components/shell";
export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  try {
    user = await currentUser();
  } catch {
    return (
      <main className="service-error">
        <h1>后台服务暂时不可用</h1>
        <p>请确认 Go API 和 PostgreSQL 已启动。</p>
        <a href="/">重新连接</a>
      </main>
    );
  }
  if (!user) redirect("/login");
  return <Shell user={user}>{children}</Shell>;
}
