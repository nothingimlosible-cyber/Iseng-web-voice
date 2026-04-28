// api/tts.js
export default async function handler(req, res) {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: 'Teks mana, Lan?' });

  // Pake jalur Google TTS Proxy (Gratis & No API Key)
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=id&client=tw-ob`;

  // Kirim balik URL-nya ke frontend
  res.status(200).json({ audioUrl: url });
}
