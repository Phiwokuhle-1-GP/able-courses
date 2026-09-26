import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteOrigin } from "./site-config";
import PageTracker from "./page-tracker";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "ABLE | Beginner Courses for Johannesburg & South Africa",
  description: "Explore beginner coding, video editing and data analytics courses for Johannesburg, Randburg, Sandton, Rosebank, Cape Town and online learners across South Africa.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: "ABLE", title: "ABLE | Beginner Courses", description: "Learn to code, edit video and work with data. Build something real with ABLE.", url: siteOrigin },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>
    <header className="site-header"><div className="container nav-inner">
      <Link className="brand" href="/" aria-label="ABLE home"><strong><span className="brand-white">A</span><span className="brand-blue">BL</span><span className="brand-white">E</span></strong><small>CODE <b>•</b> EDIT <b>•</b> DATA</small></Link>
      <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#choose">Courses</Link><Link href="/locations">Locations</Link><Link href="/owner">Owner</Link></nav>
      <Link className="nav-cta" href="/#choose">Choose a course <span aria-hidden="true">→</span></Link>
    </div></header>
    <PageTracker />
    {children}
    <footer className="site-footer"><div className="container footer-inner"><Link className="footer-brand" href="/">A<span>BL</span>E</Link><p>Learn it. Build it. Be able.</p><Link href="/owner">Owner dashboard</Link><span>© 2026 ABLE</span></div></footer>
  </body></html>;
}
