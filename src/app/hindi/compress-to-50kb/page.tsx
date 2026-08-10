"use client";

import { TargetKbLander } from "@/components/TargetKbLander";

export default function Page() {
  return (
    <TargetKbLander
      targetKb={50}
      titleAccent="50KB"
      path="/hindi/compress-to-50kb/"
      seoHeading="फोटो को 50KB में compress करें — फ्री"
      paragraphs={[
        "Photo size kam kaise kare 50KB? Size to KB पर crop करें, 50KB तक compress करें, Free Download करें। फाइल सेव नहीं होती।",
      ]}
    />
  );
}
