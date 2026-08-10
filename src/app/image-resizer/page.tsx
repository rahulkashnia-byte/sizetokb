import CustomPage from "../custom/page";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";

export default function ImageResizerPage() {
  return (
    <>
      <CustomPage />
      <SeoKeywordBlock
        heading="Reduce image size online free — compress photo to 20KB, 50KB, 100KB"
        paragraphs={[
          "This free image size reducer helps you reduce image size in KB for SSC, UPSC, NEET, Banking and Railway form fill. Set targets people search for: compress image to 50KB, compress image to 20KB, reduce photo size to 50KB, photo size kam kaise kare, JPG compressor online free, and decrease image size online — with optional width/height in cm or px.",
          "Works on mobile and desktop. Processing stays private in your browser on Size to KB.",
        ]}
        links={[
          { href: "/custom/", label: "Custom reduce size" },
          { href: "/", label: "Exam presets" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
        ]}
      />
    </>
  );
}
