"use client";

import { TargetKbLander } from "@/components/TargetKbLander";

export default function Page() {
  return (
    <TargetKbLander
      targetKb={50}
      titleAccent="50KB"
      path="/telugu/compress-to-50kb/"
      seoHeading="ఫోటోను 50KBకి compress చేయండి — ఉచితం"
      paragraphs={[
        "Photo size ela taggali 50KB? Size to KBలో crop చేసి 50KB వరకు compress చేసి Free Download చేయండి. ఫైల్ సేవ్ కాదు.",
      ]}
    />
  );
}
