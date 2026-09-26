import { env } from "cloudflare:workers";

export async function saveEnquiry(input: {name: string; email: string; phone: string; course: string; message: string}) {
  if (!env.DB) throw new Error("Course enquiries are temporarily unavailable");
  await env.DB.prepare(
    "INSERT INTO enquiries (created_at, name, email, phone, course, message) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(new Date().toISOString(), input.name, input.email, input.phone || null, input.course, input.message || null).run();
}
