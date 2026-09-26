"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");
  useEffect(() => {
    if (!pathname || pathname.startsWith("/owner") || lastPath.current === pathname) return;
    lastPath.current = pathname;
    const params = new URLSearchParams(window.location.search);
    void fetch("/api/track", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        path: pathname, referrer: document.referrer,
        utmSource: params.get("utm_source"), campaign: params.get("utm_campaign"),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
  return null;
}
