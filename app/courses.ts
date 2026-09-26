export type Course = {
  slug: string; name: string; short: string; tagline: string; accent: string;
  image: string; projectImage: string; description: string; lead: string;
  skills: string[]; outcome: string; forWhom: string; seoTitle: string; seoDescription: string;
  searchHeading: string; searchCopy: string; questions: { question: string; answer: string }[];
};

export const courses: Course[] = [
  {
    slug: "able-code", name: "ABLE CODE", short: "Code", tagline: "Build your first program.", accent: "purple",
    image: "/images/course-code.jpg", projectImage: "/images/project-code.jpg",
    description: "Learn how code works, practise Python fundamentals and build a small working program you can explain.",
    lead: "No coding experience? Start with the basics, practise one step at a time and finish with something you built yourself.",
    skills: ["Python basics", "Variables and simple logic", "Conditions and loops", "Functions", "Problem solving", "A mini Python project"],
    outcome: "A working Python program you can demonstrate and explain.",
    forWhom: "For complete beginners, teens curious about coding and adults exploring a new direction.",
    seoTitle: "Learn to Code in Johannesburg | Beginner Python Course | ABLE",
    seoDescription: "Learn to code with ABLE's four-week beginner Python course. Join online from Johannesburg, Randburg or Sandton; practise programming and build your first project.",
    searchHeading: "Learn to code with beginner Python lessons",
    searchCopy: "If you are looking for coding classes in Johannesburg, start with practical Python programming: write simple instructions, use variables and loops, and build a mini project. Join online from Randburg, Sandton or elsewhere in South Africa; ask us about in-person class availability.",
    questions: [
      { question: "Do I need to know how to code?", answer: "No. ABLE CODE starts with Python fundamentals and is designed for complete beginners." },
      { question: "Can I join a coding class from Randburg or Sandton?", answer: "Yes, online learning is available from Randburg, Sandton and across South Africa. Enquire to confirm the next class and any in-person options." },
    ],
  },
  {
    slug: "able-edit", name: "ABLE EDIT", short: "Edit", tagline: "Tell your first story.", accent: "orange",
    image: "/images/course-edit.jpg", projectImage: "/images/project-edit.jpg",
    description: "Learn how to turn raw footage into a clear video using a practical editing workflow.",
    lead: "Turn clips into a story. Learn the editing process hands on and leave with a finished video you can share.",
    skills: ["Editing workflow", "Selecting and arranging shots", "Cuts and transitions", "Audio and music", "Titles and graphics", "Colour basics and export"],
    outcome: "A short, polished video edited and exported by you.",
    forWhom: "For complete beginners, young creatives and aspiring social media or video creators.",
    seoTitle: "Learn Video Editing in Johannesburg | Beginner Course | ABLE",
    seoDescription: "Learn to edit videos in a four-week beginner course. ABLE EDIT covers cutting footage, audio, titles, colour and export. Join online from Johannesburg or nearby areas.",
    searchHeading: "Learn to edit videos, from raw clips to final export",
    searchCopy: "Looking for video editing classes in Johannesburg? Learn the editing workflow for short videos and social media content: choose clips, shape a story, improve sound, add titles and export your work. You can learn online from Randburg, Sandton, Rosebank and across South Africa; ask about in-person availability.",
    questions: [
      { question: "Is this video editing course suitable for beginners?", answer: "Yes. You can start without editing experience and work toward a finished short video." },
      { question: "Can I learn video editing online from Johannesburg?", answer: "Yes. Online classes are available for learners in Johannesburg and across South Africa. Enquire for the next class details." },
    ],
  },
  {
    slug: "able-data", name: "ABLE DATA", short: "Data", tagline: "Turn data into answers.", accent: "green",
    image: "/images/course-data.jpg", projectImage: "/images/project-data.jpg",
    description: "Learn to organise, clean, explore and visualise data using tools analysts use in real work.",
    lead: "Open a dataset and know what to do next. Clean it, find a useful answer and turn your results into a simple dashboard.",
    skills: ["Excel and data fundamentals", "Importing and understanding data", "Data cleaning", "Simple analysis", "Charts and visualisation", "A mini dashboard"],
    outcome: "A simple data analysis dashboard built from a real-style dataset.",
    forWhom: "For complete beginners, students exploring data careers and professionals who want more confidence with data.",
    seoTitle: "Data Analytics Course in Johannesburg | Beginner Excel | ABLE",
    seoDescription: "Start data analytics with ABLE's four-week beginner course. Learn Excel, data cleaning, charts and a mini dashboard online from Johannesburg, Randburg or Sandton.",
    searchHeading: "Learn data analytics and build a simple dashboard",
    searchCopy: "Start with an approachable introduction to data analysis: import a dataset, clean it, find patterns in Excel, create charts and explain your findings in a mini dashboard. Online classes welcome beginners from Johannesburg, Randburg, Sandton, Rosebank and the rest of South Africa.",
    questions: [
      { question: "Do I need experience with data analytics?", answer: "No. This beginner course starts with Excel and data fundamentals before moving to cleaning, charts and a mini dashboard." },
      { question: "Is the data analytics course available online?", answer: "Yes. Learners can join online from Johannesburg and elsewhere in South Africa. Enquire for the next available class." },
    ],
  },
];
const previousSlugs: Record<string, string> = {
  "ican-code": "able-code", "ican-edit": "able-edit", "ican-data": "able-data",
};
export function getCourse(slug: string) {
  return courses.find(course => course.slug === (previousSlugs[slug] ?? slug));
}
export function courseSlugs(slug: string) {
  return [slug, ...Object.entries(previousSlugs).filter(([, current]) => current === slug).map(([previous]) => previous)];
}
