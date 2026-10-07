import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "@/lib/cv-pdf";

// Generated once at build time and served as a static file.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(
    createElement(CvDocument) as Parameters<typeof renderToBuffer>[0],
  );

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Moses-Kwagga-CV.pdf"',
    },
  });
}
