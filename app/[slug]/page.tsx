import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { courses, getCourse } from "../courses";
import { siteOrigin } from "../site-config";
import EnquiryForm from "../enquiry-form";

export function generateStaticParams() { return courses.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: { canonical: "/"+course.slug },
    openGraph: { type: "website", siteName: "ABLE", title: course.seoTitle, description: course.seoDescription, url: siteOrigin+"/"+course.slug },
  };
}

export default async function CoursePage({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  if (slug !== course.slug) permanentRedirect("/"+course.slug);
  const schema = { "@context": "https://schema.org", "@type": "Course", name: course.searchHeading, description: course.description, provider: { "@type": "Organization", name: "ABLE", url: siteOrigin }, url: siteOrigin+"/"+course.slug, educationalLevel: "Beginner", inLanguage: "en-ZA" };
  return <main className={"course-page "+course.accent}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="course-hero"><div className="container hero-layout">
      <div className="hero-content">
        <p className="eyebrow">BEGINNER INTRODUCTION COURSE</p><h1>{course.name}</h1><h2>{course.tagline}</h2><p className="hero-lead">{course.lead}</p>
        <div className="hero-actions"><a className="button accent-button" href="#enquire">Enquire about {course.short} <span aria-hidden="true">→</span></a><a className="plain-link" href="#learn">What you&apos;ll learn ↓</a></div>
        <div className="hero-proof"><span>No experience needed</span><span>Small groups</span><span>Hands on project</span></div>
      </div>
      <div className="hero-image"><Image src="/images/hero-person.jpg" alt="Learner working at a laptop" fill priority sizes="(max-width: 800px) 100vw, 48vw" /><div className="hero-stamp"><strong>4 weeks</strong><span>2 × 90-minute sessions / week</span><b>R1,500</b></div></div>
    </div></section>

    <section className="course-switch container" aria-label="Explore ABLE courses"><span>Explore another course</span><div>{courses.map(item => <Link key={item.slug} href={"/"+item.slug} aria-current={item.slug === slug ? "page" : undefined}>{item.name}</Link>)}</div></section>

    <section className="learn-section" id="learn"><div className="container learn-layout"><div className="section-heading left"><p className="eyebrow">WHAT YOU&apos;LL LEARN</p><h2>Practical skills.<br />Clear steps.</h2><p>{course.description}</p></div><ol className="skill-grid">{course.skills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill}</strong></li>)}</ol></div></section>

    <section className="project-section container"><div className="project-image"><Image src={course.projectImage} alt={"Example outcome: "+course.outcome} fill sizes="(max-width: 800px) 100vw, 47vw" /></div><div className="project-copy"><p className="eyebrow">YOUR COURSE PROJECT</p><h2>Learn it.<br />Then build it.</h2><p>Bring the lessons together in a guided project you can show and explain.</p><div className="outcome"><span>YOUR OUTCOME</span><strong>{course.outcome}</strong></div></div></section>

    <section className="format-section"><div className="container format-layout"><div><p className="eyebrow">THE FORMAT</p><h2>A manageable way to begin.</h2><p>{course.forWhom}</p></div><div className="format-facts"><div><strong>4 weeks</strong><span>Short introduction course</span></div><div><strong>2 sessions / week</strong><span>90 minutes each</span></div><div><strong>Up to 10 learners</strong><span>Small group support</span></div><div><strong>Online or in person</strong><span>Ask about the next available class</span></div></div></div></section>

    <section className="course-locations container"><div><p className="eyebrow">WHERE YOU CAN LEARN</p><h2>Learn from Johannesburg or anywhere in South Africa.</h2><p>Online classes are an option for learners in Randburg, Sandton, Rosebank, Cape Town and beyond. Tell us your area when you enquire; we&apos;ll confirm any current in-person availability.</p></div><Link href="/locations">See locations & formats →</Link></section>

    <section className="course-search-content container"><h2>{course.searchHeading}</h2><p>{course.searchCopy}</p><div className="course-questions">{course.questions.map(({question, answer}) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}</div></section>

    <section className="enquire-section" id="enquire"><div className="container enquiry-layout"><div><p className="eyebrow">READY TO TRY IT?</p><h2>Ask about your next class.</h2><p>Tell us how to reach you. We&apos;ll reply with availability and the next step. No payment is taken here.</p><div className="fee"><span>Course fee</span><strong>R1,500</strong><small>Four-week introduction course</small></div></div><EnquiryForm course={course} /></div></section>
  </main>;
}
