export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const r = await fetch(`/api/admin/${path}`, {
    ...options,
    headers:
      options.body instanceof FormData
        ? options.headers
        : { "Content-Type": "application/json", ...options.headers },
    cache: "no-store",
  });
  const body = await r.json();
  if (!r.ok) {
    if (r.status === 401 && path !== "login" && path !== "password")
      window.location.assign("/login");
    throw new Error(body.error || "请求失败，请稍后重试");
  }
  return body as T;
}
export const dateTime = (s: string) =>
  new Date(s).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false,
  });
export const number = (n: number) => n.toLocaleString("zh-CN");
