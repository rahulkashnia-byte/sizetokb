"use client";

import { TargetKbLander } from "@/components/TargetKbLander";

export default function Page() {
  return (
    <TargetKbLander
      targetKb={50}
      titleAccent="50KB"
      path="/marathi/compress-to-50kb/"
      seoHeading="फोटो 50KB मध्ये compress करा — मोफत"
      paragraphs={[
        "Photo size kami kara 50KB? Size to KB वर crop करा, 50KB पर्यंत compress करा, Free Download करा. फाइल सेव्ह होत नाही.",
      ]}
    />
  );
}
