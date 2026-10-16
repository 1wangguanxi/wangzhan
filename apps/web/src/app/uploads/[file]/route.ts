export async function GET(
  _: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  if (!/^[a-f0-9]{64}\.(png|jpg|webp|gif)$/.test(file))
    return new Response(null, { status: 404 });
  try {
    const r = await fetch(
      `${process.env.CONTENT_API_URL || "http://127.0.0.1:8080"}/uploads/${file}`,
      { cache: "no-store", signal: AbortSignal.timeout(5000) },
    );
    return new Response(r.body, {
      status: r.status,
      headers: {
        "Content-Type":
          r.headers.get("content-type") || "application/octet-stream",
        "Cache-Control": r.ok
          ? "public, max-age=31536000, immutable"
          : "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
