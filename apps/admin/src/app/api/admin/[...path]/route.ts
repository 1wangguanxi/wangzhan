import { NextRequest, NextResponse } from "next/server";
import { apiOrigin } from "@/lib/server";
const allowed =
  /^(login|logout|me|password|analytics|inquiries(?:\/\d+)?|assets(?:\/\d+(?:\/file)?)?|audit)$/;
async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const path = (await params).path.join("/");
  if (!allowed.test(path))
    return NextResponse.json({ error: "接口不存在" }, { status: 404 });
  const mutation = !["GET", "HEAD"].includes(request.method);
  if (mutation) {
    const origin = request.headers.get("origin");
    try {
      if (!origin || new URL(origin).host !== request.headers.get("host"))
        return NextResponse.json({ error: "不允许跨站提交" }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "来源无效" }, { status: 403 });
    }
  }
  const token = request.cookies.get("zhiyu_admin")?.value;
  if (path !== "login" && !token)
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  let body: Uint8Array | undefined;
  if (mutation && request.body) {
    const max = path === "assets" ? 9 * 1024 * 1024 : 32768;
    const chunks: Uint8Array[] = [];
    const reader = request.body.getReader();
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > max) {
        await reader.cancel();
        return NextResponse.json({ error: "提交内容过大" }, { status: 413 });
      }
      chunks.push(value);
    }
    body = Buffer.concat(chunks);
  }
  try {
    const upstream = await fetch(
      `${apiOrigin()}/v1/admin/${path}${request.nextUrl.search}`,
      {
        method: request.method,
        headers: {
          "Content-Type":
            request.headers.get("content-type") || "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body as BodyInit | undefined,
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      },
    );
    if (path === "login" && upstream.ok) {
      const result = await upstream.json();
      const out = NextResponse.json({ user: result.user });
      out.cookies.set("zhiyu_admin", result.token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
        path: "/",
        maxAge: 43200,
      });
      return out;
    }
    const out = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
    if (
      (["logout", "password"].includes(path) && upstream.ok) ||
      upstream.status === 401
    )
      out.cookies.delete("zhiyu_admin");
    return out;
  } catch {
    return NextResponse.json(
      { error: "后台服务暂时不可用，请稍后重试" },
      { status: 503 },
    );
  }
}
export { proxy as GET, proxy as POST, proxy as PATCH };
