export default async function handler(req, res) {
  const { text, lang } = req.query; // Kita tambah parameter lang
  const language = lang || 'id'; // Default Indonesia
  
  if (!text) return res.status(400).json({ error: 'Teks kosong' });

  // Jalur Google TTS Gratis
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${language}&client=tw-ob`;

  res.status(200).json({ audioUrl: url });
}
