import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../../owner-auth";
import { setEnquiryStatus, type EnquiryStatus } from "../../../../../db/owner-dashboard";

const allowed = new Set<EnquiryStatus>(["New", "Contacted", "Closed"]);
export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {
  if (!(await isOwnerRequest())) return NextResponse.json({error: "Forbidden"}, {status: 403});
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({error: "Invalid origin"}, {status: 403});
  const {id: rawId} = await params;
  const id = Number(rawId);
  let data: {status?: string};
  try { data = await request.json(); } catch { return NextResponse.json({error: "Invalid request"}, {status: 400}); }
  if (!Number.isSafeInteger(id) || id < 1 || !allowed.has(data.status as EnquiryStatus))
    return NextResponse.json({error: "Invalid enquiry or status"}, {status: 400});
  try {
    const found = await setEnquiryStatus(id, data.status as EnquiryStatus);
    return NextResponse.json(found ? {ok: true} : {error: "Enquiry not found"}, {status: found ? 200 : 404, headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    console.error("Enquiry status save failed", error);
    return NextResponse.json({error: "Could not update status"}, {status: 503});
  }
}
