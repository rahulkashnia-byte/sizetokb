"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackToolTime } from "@/lib/usage";

/**
 * Tracks time spent on each tool/page (for admin minutes stats).
 * Flushes on route change, tab hide, and page unload.
 */
export function UsageTracker() {
  const pathname = usePathname();
  const startedAt = useRef<number>(Date.now());
  const pathRef = useRef<string>(pathname || "/");

  useEffect(() => {
    pathRef.current = pathname || "/";
    startedAt.current = Date.now();

    const flush = () => {
      const secs = (Date.now() - startedAt.current) / 1000;
      trackToolTime(secs, pathRef.current);
      startedAt.current = Date.now();
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
      else startedAt.current = Date.now();
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", flush);
    return () => {
      flush();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname]);

  return null;
}
