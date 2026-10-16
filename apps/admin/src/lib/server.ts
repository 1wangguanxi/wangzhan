import "server-only";
import { cookies } from "next/headers";
import type { AdminUser } from "@zhiyu/admin-contracts";
export const apiOrigin = () =>
  process.env.CONTENT_API_URL || "http://127.0.0.1:8080";
export async function currentUser(): Promise<AdminUser | null> {
  const token = (await cookies()).get("zhiyu_admin")?.value;
  if (!token) return null;
  const r = await fetch(`${apiOrigin()}/v1/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (r.status === 401) return null;
  if (!r.ok) throw new Error("后台服务暂时不可用");
  return r.json();
}
