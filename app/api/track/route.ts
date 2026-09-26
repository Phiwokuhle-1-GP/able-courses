import { NextResponse } from "next/server";
import { savePageView } from "../../../db/owner-dashboard";

const paths = new Set(["/", "/able-code", "/able-edit", "/able-data", "/locations"]);
const botPattern = /bot|crawler|spider|slurp|headless|preview|facebookexternalhit/i;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({error: "Invalid origin"}, {status: 403});
  if (Number(request.headers.get("content-length") || 0) > 4096) return NextResponse.json({error: "Invalid request"}, {status: 413});
  if (botPattern.test(request.headers.get("user-agent") || "")) return NextResponse.json({ok: true, tracked: false});
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return NextResponse.json({error: "Invalid request"}, {status: 400}); }
  const path = String(data.path || "");
  if (!paths.has(path)) return NextResponse.json({error: "Invalid page"}, {status: 400});
  const campaign = String(data.campaign || "").trim().slice(0, 80) || null;
  const utmSource = String(data.utmSource || "").trim().toLowerCase().slice(0, 60);
  let source = "direct";
  if (utmSource && /^[a-z0-9 _.-]+$/.test(utmSource)) source = utmSource;
  else if (typeof data.referrer === "string") {
    try {
      const host = new URL(data.referrer).hostname.toLowerCase();
      if (host && host !== new URL(request.url).hostname) source = host.slice(0, 80);
    } catch { /* Direct visit. */ }
  }
  try {
    await savePageView({path, source, campaign});
    return NextResponse.json({ok: true, tracked: true}, {headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    console.error("Page view save failed", error);
    return NextResponse.json({error: "Tracking unavailable"}, {status: 503});
  }
}
