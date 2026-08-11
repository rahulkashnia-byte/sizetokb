"use client";

import { useEffect, useState } from "react";
import { NewsletterBrowse } from "@/components/NewsletterBrowse";

export function NewsletterPageClient() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("p");
      setSlug(p);
    } catch {
      setSlug(null);
    }
  }, []);

  return <NewsletterBrowse initialSlug={slug} />;
}
