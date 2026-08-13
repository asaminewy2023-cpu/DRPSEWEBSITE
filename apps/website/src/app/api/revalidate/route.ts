import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag") || "cms";

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  revalidateTag(tag, "max");
  return Response.json({ revalidated: true, tag, now: Date.now() });
}
