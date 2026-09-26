"use client";

import { useState, type FormEvent } from "react";
import type { Course } from "./courses";

export default function EnquiryForm({ course }: {course: Course}) {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setState("sending"); setError("");
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...values, course: course.slug}) });
      if (!response.ok) {
        const result = await response.json().catch(() => ({})) as {error?: string};
        throw new Error(result.error || "Your enquiry could not be sent. Please try again.");
      }
      form.reset(); setState("sent");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your enquiry could not be sent.");
      setState("error");
    }
  }
  if (state === "sent") return <div className="form-card success-card" role="status"><span className="success-mark">✓</span><h3>Enquiry sent</h3><p>Thank you for your interest in {course.name}. We have your details and can follow up about the next class.</p><button className="text-action" type="button" onClick={() => setState("idle")}>Send another enquiry</button></div>;
  return <form className="form-card" onSubmit={submit}>
    <div className="form-head"><span>COURSE ENQUIRY</span><h3>{course.name}</h3><p>We&apos;ll use your details only to respond to this enquiry.</p></div>
    <label>Full name <input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" /></label>
    <label>Email address <input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com" /></label>
    <label>Phone or WhatsApp <span className="optional">optional</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your number" /></label>
    <label>Your area or a question <span className="optional">optional</span><textarea name="message" rows={3} maxLength={1000} placeholder="For example, Randburg—are in-person classes available?" /></label>
    <div className="trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {state === "error" && <p className="form-error" role="alert">{error}</p>}
    <button className="button accent-button form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send course enquiry →"}</button>
  </form>;
}
