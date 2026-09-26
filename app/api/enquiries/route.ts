import { NextResponse } from "next/server";
import { getCourse } from "../../courses";
import { saveEnquiry } from "../../../db/enquiries";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return NextResponse.json({error: "Please check your details."}, {status: 400}); }
  if (typeof data.website === "string" && data.website.trim()) return NextResponse.json({ok: true});
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();
  const course = String(data.course ?? "");
  if (name.length < 2 || name.length > 100 || email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length > 40 || message.length > 1000 || !getCourse(course))
    return NextResponse.json({error: "Please enter a valid name, email and course."}, {status: 400});
  try {
    await saveEnquiry({name, email, phone, message, course});
    return NextResponse.json({ok: true}, {status: 201, headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    console.error("Enquiry save failed", error);
    return NextResponse.json({error: "Enquiries are temporarily unavailable. Please try again shortly."}, {status: 503});
  }
}
