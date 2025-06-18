const express = require('express');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Accept JSON POST requests
app.use(express.json({ limit: '10mb' }));

app.post('/ocr', async (req, res) => {
  const base64 = req.body.img;

  if (!base64 || !base64.startsWith('data:image')) {
    return res.status(400).json({ status: 'error', message: 'Invalid or missing base64 image' });
  }

  try {
    const result = await Tesseract.recognize(base64, 'eng');
    res.json({ status: 'success', text: result.data.text.trim() });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🟢 OCR API running at http://localhost:${PORT}/ocr`);
});
