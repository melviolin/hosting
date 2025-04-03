const fetch = require('node-fetch');  // Para hacer solicitudes HTTP
const pdfParse = require('pdf-parse'); // Para analizar el PDF

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Extraer el enlace del PDF enviado desde el cuerpo de la solicitud
      const { pdfUrl } = req.body;

      // Descargar el archivo PDF desde Google Drive
      const response = await fetch(pdfUrl);
      const pdfBuffer = await response.buffer();

      // Analizar el PDF y obtener la cantidad de páginas
      const pdfData = await pdfParse(pdfBuffer);
      const numPages = pdfData.numpages;

      // Retornar el número de páginas en formato JSON
      res.status(200).json({ numPages: numPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
