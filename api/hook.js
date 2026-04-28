export default async function handler(req, res) {
  const { topic } = req.query;
  const API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!topic) return res.status(400).json({ error: "Isi topiknya, Lan!" });

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Kamu ahli TikTok marketing. Buat 3 hook viral Bahasa Indonesia yang bikin penasaran." },
          { role: "user", content: topic }
        ]
      })
    });
    const data = await response.json();
    res.status(200).json({ hook: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "Gagal konek DeepSeek. Cek API Key di Vercel!" });
  }
}
