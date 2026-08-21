"use client";

import { TargetKbLander } from "@/components/TargetKbLander";

export default function Page() {
  return (
    <TargetKbLander
      targetKb={50}
      titleAccent="50KB"
      path="/tamil/compress-to-50kb/"
      seoHeading="புகைப்படத்தை 50KBக்கு compress செய்யுங்கள் — இலவசம்"
      paragraphs={[
        "Photo size reduce Tamil 50KB? Size to KB-ல் crop செய்து 50KB வரை compress செய்து Free Download செய்யுங்கள். கோப்பு சேமிக்கப்படாது.",
      ]}
    />
  );
}
