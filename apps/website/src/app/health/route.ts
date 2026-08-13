import { CMS_BASE_URL } from "@sevp/shared";

export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();
  let cmsStatus: "ok" | "unreachable" = "ok";
  let cmsDetail = {};
  let cmsLatencyMs: number | null = null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${CMS_BASE_URL}/api/health`, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);
    cmsLatencyMs = Date.now() - started;
    if (!res.ok) {
      cmsStatus = "unreachable";
      cmsDetail = { http: res.status };
    } else {
      try {
        cmsDetail = (await res.json()) as Record<string, unknown>;
      } catch {
        cmsDetail = { http: res.status };
      }
    }
  } catch (error) {
    cmsStatus = "unreachable";
    const message = error instanceof Error ? error.message : String(error);
    cmsDetail = { error: message };
    cmsLatencyMs = Date.now() - started;
  }

  const status = cmsStatus === "ok" ? 200 : 503;

  return Response.json(
    {
      status: cmsStatus === "ok" ? "ok" : "degraded",
      service: "website",
      cms: cmsStatus,
      cmsUrl: CMS_BASE_URL,
      cmsLatencyMs,
      cmsDetails: cmsDetail,
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - started,
    },
    { status },
  );
}