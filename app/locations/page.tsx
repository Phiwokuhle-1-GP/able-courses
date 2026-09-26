import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "../courses";
import { siteOrigin } from "../site-config";

export const metadata: Metadata = {
  title: "Beginner Courses in Johannesburg & Online South Africa | ABLE",
  description: "Explore ABLE beginner coding, video editing and data courses for learners in Johannesburg, Randburg, Sandton, Rosebank, Cape Town and across South Africa. Online learning is available; ask about in-person classes.",
  alternates: {canonical: "/locations"},
  openGraph: {title:"ABLE courses for Johannesburg & South Africa",description:"Beginner coding, video editing and data courses. Learn online or ask about in-person availability.",url:siteOrigin+"/locations"},
};

export default function LocationsPage() {
  return <main className="locations-page">
    <section className="locations-hero"><div className="container"><p className="eyebrow">WHERE YOU CAN LEARN</p><h1>A practical start, wherever you are.</h1><p>Explore coding, video editing and data analytics with ABLE. Online classes can be joined from across South Africa. Ask us about current in-person class availability before making travel plans.</p><a className="button button-blue" href="#courses-by-location">Find your course →</a></div></section>
    <section className="location-content container">
      <div className="section-heading left"><p className="eyebrow">JOHANNESBURG & BEYOND</p><h2>Start close to home—or online.</h2><p>Choose a course first, then tell us where you are. We&apos;ll confirm the next class and available format when we reply.</p></div>
      <div className="location-grid">
        <article><span>01</span><h3>Johannesburg</h3><p>Join an online introduction from Johannesburg or ask about an in-person group. Each course is designed for beginners and ends with a guided project.</p></article>
        <article><span>02</span><h3>Randburg</h3><p>Based in Randburg? Enquire about the next ABLE Code, Edit or Data class and the formats currently offered.</p></article>
        <article><span>03</span><h3>Sandton & Rosebank</h3><p>Learners in Sandton and Rosebank can join online. Tell us if an in-person class is important to you and we&apos;ll confirm availability.</p></article>
        <article><span>04</span><h3>Cape Town</h3><p>Join from Cape Town online and ask us about any current in-person options before planning to attend.</p></article>
      </div>
      <p className="location-note">ABLE has not listed fixed training venues or city-specific dates. We&apos;ll confirm the location and format for a class when you enquire.</p>
    </section>
    <section className="location-courses" id="courses-by-location"><div className="container"><div className="section-heading"><p className="eyebrow">PICK YOUR COURSE</p><h2>What would you like to build?</h2><p>Four weeks · two 90-minute sessions per week · up to 10 learners.</p></div><div className="location-course-grid">
      {courses.map(course => <Link href={"/"+course.slug} key={course.slug} className={"location-course "+course.accent}><span>BEGINNER COURSE</span><h3>{course.name}</h3><p>{course.tagline}</p><strong>Explore & enquire →</strong></Link>)}
    </div></div></section>
  </main>;
}
