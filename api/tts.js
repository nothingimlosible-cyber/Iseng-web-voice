export default async function handler(req, res) {
  const { text, voice } = req.query;
  const selectedVoice = voice || 'id-ID-ArdiNeural';

  if (!text) return res.status(400).json({ error: "Teks kosong!" });

  // Pake provider Edge-TTS Gratis (Bukan Google Translate)
  const url = `https://api.pawan.krd/tts?text=${encodeURIComponent(text)}&voice=${selectedVoice}`;

  res.status(200).json({ audioUrl: url });
}
