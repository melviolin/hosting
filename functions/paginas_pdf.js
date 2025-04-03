import { PDFDocument } from "pdf-lib";

export default async function (request, env) {
  if (request.method !== "POST") {
    return new Response("Método no permitido", { status: 405 });
  }

  try {
    const { pdfUrl } = await request.json();
    if (!pdfUrl) {
      return new Response("Falta el parámetro pdfUrl", { status: 400 });
    }

    // Descargar el PDF desde el URL recibido
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();

    // Cargar el PDF con pdf-lib
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const numPages = pdfDoc.getPageCount();

    return new Response(JSON.stringify({ pages: numPages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

