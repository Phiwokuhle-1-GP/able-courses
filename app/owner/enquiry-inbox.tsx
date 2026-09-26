"use client";

import { useMemo, useState } from "react";
import { getCourse } from "../courses";
import type { EnquiryRecord, EnquiryStatus } from "../../db/owner-dashboard";

const filters = ["All", "New", "Contacted", "Closed"] as const;
function courseName(slug: string) { return getCourse(slug)?.name ?? slug; }
function nextStatus(status: EnquiryStatus): EnquiryStatus { return status === "New" ? "Contacted" : status === "Contacted" ? "Closed" : "New"; }
function nextLabel(status: EnquiryStatus) { return status === "New" ? "Mark contacted" : status === "Contacted" ? "Close enquiry" : "Reopen"; }

export default function EnquiryInbox({initial}: {initial: EnquiryRecord[]}) {
  const [enquiries, setEnquiries] = useState(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const visible = useMemo(() => enquiries.filter(row => {
    if (filter !== "All" && row.status !== filter) return false;
    return [row.name,row.email,row.course,row.message || ""].join(" ").toLowerCase().includes(query.trim().toLowerCase());
  }), [enquiries,filter,query]);

  async function advance(row: EnquiryRecord) {
    const status = nextStatus(row.status);
    setBusy(row.id); setError("");
    try {
      const response = await fetch("/api/owner/enquiries/"+row.id, {
        method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({status}),
      });
      if (!response.ok) throw new Error("Could not update this enquiry. Please try again.");
      setEnquiries(current => current.map(item => item.id === row.id ? {...item,status} : item));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not update this enquiry.");
    } finally { setBusy(null); }
  }

  return <div>
    <div className="inbox-controls"><div className="inbox-filters" role="group" aria-label="Filter enquiries by status">
      {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div><label className="inbox-search"><span className="sr-only">Search enquiries</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search name, email or course" type="search" /></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {visible.length ? <div className="enquiry-list">{visible.map(row => <article className="enquiry-item" key={row.id}>
      <div className="enquiry-top"><div><h3>{row.name}</h3><p>{courseName(row.course)} · {new Date(row.created_at).toLocaleString("en-ZA", {timeZone:"Africa/Johannesburg",dateStyle:"medium",timeStyle:"short"})}</p></div><span className={"status-pill status-"+row.status.toLowerCase()}>{row.status}</span></div>
      {row.message && <p className="enquiry-message">{row.message}</p>}
      <div className="enquiry-contact"><a href={"mailto:"+encodeURIComponent(row.email)+"?subject="+encodeURIComponent("Your "+courseName(row.course)+" enquiry")}>{row.email}</a>{row.phone && <span>{row.phone}</span>}</div>
      <div className="enquiry-actions"><a href={"mailto:"+encodeURIComponent(row.email)+"?subject="+encodeURIComponent("Your "+courseName(row.course)+" enquiry")}>Reply by email ↗</a><button type="button" disabled={busy === row.id} onClick={() => advance(row)}>{busy === row.id ? "Saving…" : nextLabel(row.status)}</button></div>
    </article>)}</div> : <div className="empty-enquiries">No enquiries match this view.</div>}
  </div>;
}
