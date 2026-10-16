import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next may normalize request.url to localhost; compare the actual request Host.
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host"))
        return NextResponse.json({ error: "不允许跨站提交" }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "来源格式不正确" }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json({ error: "请使用 JSON 提交" }, { status: 415 });
  const body = await request.text();
  if (Buffer.byteLength(body) > 32768)
    return NextResponse.json({ error: "内容过长" }, { status: 413 });
  try {
    const response = await fetch(
      `${process.env.CONTENT_API_URL || "http://127.0.0.1:8080"}/v1/inquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": request.headers.get("idempotency-key") || "",
        },
        body,
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    );
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "暂时无法提交，请稍后重试，或直接扫码加微信咨询" },
      { status: 503 },
    );
  }
}
