import { env } from "cloudflare:workers";

export type EnquiryStatus = "New" | "Contacted" | "Closed";
export type EnquiryRecord = {
  id: number; created_at: string; name: string; email: string;
  phone: string | null; course: string; message: string | null; status: EnquiryStatus;
};
export type DashboardData = {
  totalEnquiries: number; newEnquiries: number; views30d: number; enquiries30d: number;
  daily: { day: string; views: number }[];
  courseViews: { path: string; views: number }[];
  courseEnquiries: { course: string; enquiries: number }[];
  sources: { source: string; views: number }[];
  campaigns: { campaign: string; views: number }[];
  enquiries: EnquiryRecord[];
};

function database() {
  if (!env.DB) throw new Error("Site database is unavailable");
  return env.DB;
}

export async function savePageView(input: { path: string; source: string; campaign: string | null }) {
  await database().prepare(
    "INSERT INTO page_views (created_at, path, source, campaign) VALUES (?, ?, ?, ?)"
  ).bind(new Date().toISOString(), input.path, input.source, input.campaign).run();
}

export async function getDashboardData(): Promise<DashboardData> {
  const db = database();
  const since30 = new Date(Date.now() - 30 * 86400000).toISOString();
  const since14 = new Date(Date.now() - 13 * 86400000).toISOString();
  const [enquiryTotals, viewTotal, dayRows, pageRows, courseRows, sourceRows, campaignRows, recent] = await Promise.all([
    db.prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS new_count, SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS recent_count FROM enquiries").bind(since30).first<{total: number; new_count: number | null; recent_count: number | null}>(),
    db.prepare("SELECT COUNT(*) AS count FROM page_views WHERE created_at >= ?").bind(since30).first<{count: number}>(),
    db.prepare("SELECT date(created_at, '+2 hours') AS day, COUNT(*) AS views FROM page_views WHERE created_at >= ? GROUP BY day ORDER BY day").bind(since14).all<{day: string; views: number}>(),
    db.prepare("SELECT path, COUNT(*) AS views FROM page_views WHERE created_at >= ? GROUP BY path ORDER BY views DESC").bind(since30).all<{path: string; views: number}>(),
    db.prepare("SELECT course, COUNT(*) AS enquiries FROM enquiries WHERE created_at >= ? GROUP BY course").bind(since30).all<{course: string; enquiries: number}>(),
    db.prepare("SELECT source, COUNT(*) AS views FROM page_views WHERE created_at >= ? GROUP BY source ORDER BY views DESC LIMIT 6").bind(since30).all<{source: string; views: number}>(),
    db.prepare("SELECT campaign, COUNT(*) AS views FROM page_views WHERE created_at >= ? AND campaign IS NOT NULL GROUP BY campaign ORDER BY views DESC LIMIT 6").bind(since30).all<{campaign: string; views: number}>(),
    db.prepare("SELECT id, created_at, name, email, phone, course, message, status FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 100").all<EnquiryRecord>(),
  ]);
  return {
    totalEnquiries: enquiryTotals?.total ?? 0, newEnquiries: enquiryTotals?.new_count ?? 0,
    views30d: viewTotal?.count ?? 0, enquiries30d: enquiryTotals?.recent_count ?? 0,
    daily: dayRows.results, courseViews: pageRows.results, courseEnquiries: courseRows.results,
    sources: sourceRows.results, campaigns: campaignRows.results, enquiries: recent.results,
  };
}

export async function setEnquiryStatus(id: number, status: EnquiryStatus) {
  const result = await database().prepare("UPDATE enquiries SET status = ? WHERE id = ?").bind(status, id).run();
  return (result.meta.changes ?? 0) > 0;
}
