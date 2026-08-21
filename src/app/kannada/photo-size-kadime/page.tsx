import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ಫೋಟೋ ಗಾತ್ರ ಹೇಗೆ ಕಡಿಮೆ ಮಾಡುವುದು — 20KB 50KB 100KB Free",
  description:
    "Photo size reduce Kannada guide — ಫೋಟೋವನ್ನು 20KB, 50KB, 100KBಗೆ compress ಮಾಡಿ. ಸಹಿ 10–20KB. Size to KB ಉಚಿತ ಟೂಲ್.",
  path: "/kannada/photo-size-kadime/",
  keywords: [
    "photo size reduce kannada",
    "ಫೋಟೋ ಗಾತ್ರ ಕಡಿಮೆ",
    "20kb 50kb photo kannada",
    "signature size reduce kannada",
  ],
});

export default function KannadaPhotoSizeGuidePage() {
  return (
    <LegalLayout title="ಫೋಟೋ ಗಾತ್ರ ಹೇಗೆ ಕಡಿಮೆ ಮಾಡುವುದು (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size reduce Kannada</strong> — Size to KB ಉಚಿತ ಟೂಲ್‌ನಿಂದ ಫೋಟೋ exact{" "}
        <strong>20KB, 50KB ಅಥವಾ 100KB</strong>ಗೆ compress ಮಾಡಿ. ಪ್ರೊಸೆಸಿಂಗ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿ;
        ನಾವು ಫೈಲ್ ಸೇವ್ ಮಾಡುವುದಿಲ್ಲ.
      </p>
      <h2>ವೇಗದ ವಿಧಾನ</h2>
      <ol>
        <li>
          <Link href="/kannada/compress-to-50kb/">50KB tool</Link> ತೆರೆಯಿರಿ (SSC/Bankಗೆ ಸಾಮಾನ್ಯ).
        </li>
        <li>ಫೋಟೋ → crop → compress → <strong>Free Download</strong>.</li>
        <li>
          ಫಾರಂನಲ್ಲಿ JPG ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ತಿರಸ್ಕರಿಸಿದರೆ{" "}
          <Link href="/upload-fixer/">Upload Error Fixer</Link> ನೋಡಿ.
        </li>
      </ol>
      <h2>ಹೆಚ್ಚು ಲಿಂಕ್‌ಗಳು</h2>
      <ul>
        <li>
          <Link href="/kannada/">ಕನ್ನಡ ಹೋಮ್</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">20KB</Link> ·{" "}
          <Link href="/compress-to-100kb/">100KB</Link>
        </li>
        <li>
          <Link href="/signature-cleaner/">ಸಹಿ cleaner / KB</Link>
        </li>
        <li>
          <Link href="/hindi/">हिंदी</Link> · <Link href="/tamil/">தமிழ்</Link> ·{" "}
          <Link href="/marathi/">मराठी</Link> · <Link href="/">English</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
