import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== request.headers.get("host"))
      return new Response(null, { status: 403 });
  } catch {
    return new Response(null, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return new Response(null, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 32768) {
      await reader.cancel();
      return new Response(null, { status: 413 });
    }
    chunks.push(value);
  }
  try {
    const r = await fetch(
      `${process.env.CONTENT_API_URL || "http://127.0.0.1:8080"}/v1/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Buffer.concat(chunks),
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      },
    );
    return new Response(r.status === 204 ? null : await r.text(), {
      status: r.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "统计暂时不可用" }, { status: 503 });
  }
}
