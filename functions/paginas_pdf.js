import { PDFDocument } from "pdf-lib";

export async function onRequestPost({ request }) {
  try {
    const { pdfUrl } = await request.json();

    // Descargar el PDF desde la URL proporcionada
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("No se pudo descargar el PDF");

    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const numPages = pdfDoc.getPageCount();

    return new Response(JSON.stringify({ pages: numPages }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
