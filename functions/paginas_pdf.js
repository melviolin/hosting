const { PDFDocument } = require('pdf-lib');

// Función para contar el número de páginas de un PDF
async function getPDFPageCount(pdfBuffer) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error("Error al procesar el PDF:", error);
    return 0;  // Retorna 0 si hay un error
  }
}

// El código que gestionará la función de la API
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    const pdfBuffer = await request.arrayBuffer();  // Obtén el PDF como buffer
    const pageCount = await getPDFPageCount(pdfBuffer);
    
    return new Response(JSON.stringify({ pageCount }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response("Método no permitido", { status: 405 });
  }
}

