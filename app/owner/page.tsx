import type { Metadata } from "next";
import Link from "next/link";
import { courses, courseSlugs } from "../courses";
import { requireOwnerPage } from "../owner-auth";
import { getDashboardData } from "../../db/owner-dashboard";
import EnquiryInbox from "./enquiry-inbox";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Owner dashboard | ABLE",
  robots: {index: false, follow: false},
};

function dayKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {timeZone: "Africa/Johannesburg", year: "numeric", month: "2-digit", day: "2-digit"}).format(date);
}

export default async function OwnerPage() {
  const owner = await requireOwnerPage();
  let data;
  try { data = await getDashboardData(); }
  catch (error) {
    console.error("Owner dashboard load failed", error);
    return <main className="owner-shell container"><div className="owner-head"><div><p className="eyebrow">ABLE OWNER</p><h1>Dashboard</h1></div><Link href="/">View site →</Link></div><div className="owner-error">The dashboard is temporarily unavailable. Please refresh in a moment.</div></main>;
  }

  const today = new Date();
  const daily = Array.from({length: 14}, (_, index) => {
    const date = new Date(today.getTime() - (13-index)*86400000);
    const day = dayKey(date);
    return {day, views: data.daily.find(row => row.day === day)?.views ?? 0};
  });
  const peak = Math.max(1, ...daily.map(row => row.views));
  return <main className="owner-shell">
    <div className="container">
      <div className="owner-head"><div><p className="eyebrow">ABLE OWNER</p><h1>Enquiries & analytics</h1><p>Welcome, {owner.displayName}. Track interest and follow up with learners.</p></div><Link className="owner-site-link" href="/">View site →</Link></div>
      <section className="owner-metrics" aria-label="Last 30 days overview">
        <article><span>New enquiries</span><strong>{data.newEnquiries}</strong><small>All time, awaiting follow-up</small></article>
        <article><span>Enquiries</span><strong>{data.enquiries30d}</strong><small>Last 30 days</small></article>
        <article><span>Tracked page views</span><strong>{data.views30d}</strong><small>Last 30 days · not unique visitors</small></article>
        <article><span>Enquiries / views</span><strong>{data.views30d ? ((data.enquiries30d/data.views30d)*100).toFixed(1) : "0.0"}%</strong><small>Indicative ratio, last 30 days</small></article>
      </section>
      <section className="owner-analytics-grid">
        <article className="owner-panel trend-panel"><div className="panel-head"><div><p className="eyebrow">TRAFFIC</p><h2>Page views by day</h2></div><span>Last 14 days · SAST</span></div>
          <div className="daily-bars" role="img" aria-label={"Page views over the last 14 days: "+daily.map(row => row.day+": "+row.views).join(", ")}>
            {daily.map(row => <div className="daily-bar" key={row.day}><span className="bar-count">{row.views || ""}</span><i style={{height: Math.max(4,(row.views/peak)*100)+"%"}} /><small>{row.day.slice(5)}</small></div>)}
          </div>
        </article>
        <article className="owner-panel source-panel"><div className="panel-head"><div><p className="eyebrow">DISCOVERY</p><h2>Traffic sources</h2></div><span>Last 30 days</span></div>
          {data.sources.length ? <ul className="source-list">{data.sources.map(row => <li key={row.source}><span>{row.source}</span><strong>{row.views}</strong></li>)}</ul> : <p className="quiet">Sources will appear after visitors open the course pages.</p>}
          {data.campaigns.length > 0 && <div className="campaign-list"><h3>Campaigns</h3><ul className="source-list">{data.campaigns.map(row => <li key={row.campaign}><span>{row.campaign}</span><strong>{row.views}</strong></li>)}</ul></div>}
        </article>
      </section>
      <section className="owner-panel course-panel"><div className="panel-head"><div><p className="eyebrow">COURSES</p><h2>Interest by course</h2></div><span>Last 30 days</span></div><div className="course-performance">
        {courses.map(course => {
          const slugs = courseSlugs(course.slug);
          const views = data.courseViews.filter(row => slugs.includes(row.path.slice(1))).reduce((sum, row) => sum + row.views, 0);
          const enquiries = data.courseEnquiries.filter(row => slugs.includes(row.course)).reduce((sum, row) => sum + row.enquiries, 0);
          return <div key={course.slug}><strong>{course.name}</strong><span>{views} views</span><span>{enquiries} enquiries</span><Link href={"/"+course.slug}>View page →</Link></div>;
        })}
      </div></section>
      <section className="owner-panel inbox-panel"><div className="panel-head"><div><p className="eyebrow">INBOX</p><h2>Course enquiries</h2></div><span>{data.totalEnquiries} total · latest 100 shown</span></div><EnquiryInbox initial={data.enquiries} /></section>
      <p className="owner-footnote">Page views are captured in the browser and exclude common bot user agents. They are not unique people or a full analytics audit. Enquiries are saved here; email notifications are not enabled.</p>
    </div>
  </main>;
}
