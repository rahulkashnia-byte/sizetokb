"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageOpen, trackToolTime } from "@/lib/usage";

/**
 * Tracks page opens + time spent on each page (for admin stats).
 */
export function UsageTracker() {
  const pathname = usePathname();
  const startedAt = useRef<number>(Date.now());
  const pathRef = useRef<string>(pathname || "/");
  const openedPath = useRef<string | null>(null);

  useEffect(() => {
    const path = pathname || "/";
    pathRef.current = path;
    startedAt.current = Date.now();

    // Count each navigation / first load as a page open
    if (openedPath.current !== path) {
      openedPath.current = path;
      trackPageOpen(path);
    }

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
