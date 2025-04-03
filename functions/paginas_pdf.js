const fetch = require('node-fetch');  // Para hacer solicitudes HTTP
const pdfParse = require('pdf-parse'); // Para analizar el PDF

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { pdfUrl } = req.body;

      const response = await fetch(pdfUrl);
      const pdfBuffer = await response.buffer();

      const pdfData = await pdfParse(pdfBuffer);
      const numPages = pdfData.numpages;

      res.status(200).json({ numPages: numPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
