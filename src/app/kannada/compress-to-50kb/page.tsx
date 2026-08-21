"use client";

import { TargetKbLander } from "@/components/TargetKbLander";

export default function Page() {
  return (
    <TargetKbLander
      targetKb={50}
      titleAccent="50KB"
      path="/kannada/compress-to-50kb/"
      seoHeading="ಫೋಟೋವನ್ನು 50KBಗೆ compress ಮಾಡಿ — ಉಚಿತ"
      paragraphs={[
        "Photo size reduce Kannada 50KB? Size to KB ನಲ್ಲಿ crop ಮಾಡಿ, 50KB ವರೆಗೆ compress ಮಾಡಿ, Free Download ಮಾಡಿ. ಫೈಲ್ ಸೇವ್ ಆಗುವುದಿಲ್ಲ.",
      ]}
    />
  );
}
