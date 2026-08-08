"use client";

import { useEffect } from "react";

/** Registers the static-export service worker for offline shell caching. */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const onLoad = () => {
      void navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore — local file:// / blocked SW */
      });
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
