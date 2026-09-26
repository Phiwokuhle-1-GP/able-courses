import Link from "next/link";
import Image from "next/image";
import { courses } from "./courses";

export default function Home() {
  return <main>
    <section className="home-hero"><div className="container home-grid">
      <div className="home-copy"><p className="eyebrow">CODE · EDIT · DATA</p>
        <h1>Discover what you&apos;re <em>able</em> to do.</h1>
        <p>Beginner friendly courses that help you try a new skill, build a real project and find your next step.</p>
        <a className="button button-blue" href="#choose">Choose your course <span aria-hidden="true">↗</span></a>
        <div className="home-facts"><span>No experience needed</span><span>Small groups</span><span>Hands on projects</span></div>
      </div>
      <div className="home-visual"><Image src="/images/hero-person.jpg" alt="Learner working on a laptop" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
    </div></section>
    <div className="brand-feature"><Image src="/images/able-wordmark.svg" alt="ABLE — Code, Edit, Data" fill sizes="100vw" /></div>
    <section className="chooser container" id="choose">
      <div className="section-heading"><p className="eyebrow">YOUR STARTING POINT</p><h2>Choose your course</h2><p>Three practical introductions. Pick the skill you want to explore first.</p></div>
      <div className="course-grid">{courses.map((course) => <Link className={"choose-card "+course.accent} key={course.slug} href={"/"+course.slug}>
        <div className="choose-card-top"><span>INTRODUCTION COURSE</span><span aria-hidden="true">↗</span></div>
        <h3>{course.name}</h3><p>{course.tagline}</p>
        <div className="choose-card-image"><Image src={course.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
        <strong>Explore the course <span aria-hidden="true">→</span></strong>
      </Link>)}</div>
    </section>
    <section className="home-locations"><div className="container home-locations-inner"><div><p className="eyebrow">LEARN FROM WHERE YOU ARE</p><h2>Johannesburg to Cape Town.</h2><p>Join online from Randburg, Sandton, Rosebank, Cape Town or elsewhere in South Africa. Ask about current in-person class availability.</p></div><Link href="/locations">Explore locations & formats →</Link></div></section>
    <section className="home-bottom"><div className="container bottom-grid"><div><p className="eyebrow">A CLEAR FIRST STEP</p><h2>Learn it. Try it. Build it.</h2></div><p>Each course runs for four weeks with two 90-minute sessions per week and a small group of up to 10 learners. Online and in-person options are available.</p></div></section>
  </main>;
}
