// api/tts.js
export default async function handler(req, res) {
  const { text } = req.query;
  if (!text) return res.status(400).send("Teks mana, Lan?");

  // Kita tembak API pihak ketiga yang nyediain Edge-TTS gratis
  const voice = "id-ID-ArdiNeural"; // Suara cowok Indonesia paling mantap
  const url = `https://api.vveai.com/tts?voice=${voice}&text=${encodeURIComponent(text)}`;

  try {
    // Balikin sebagai file audio biar bisa didownload
    res.status(200).json({ audioUrl: url });
  } catch (e) {
    res.status(500).send("Server suara lagi sibuk!");
  }
}

