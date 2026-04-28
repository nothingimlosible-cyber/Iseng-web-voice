export default async function handler(req, res) {
  // Hanya izinkan metode GET atau POST
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const topic = req.query.topic || (req.body && req.body.topic);
  const API_KEY = process.env.DEEPSEEK_API_KEY; // Ambil dari Environment Vercel

  if (!topic) {
    return res.status(400).json({ error: 'Topik harus diisi, Lan!' });
  }

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
          {
            role: "system",
            content: "Kamu adalah ahli viral marketing TikTok. Buat 3 hook singkat, padat, dan bikin penasaran dalam Bahasa Indonesia yang santai/gaul."
          },
          {
            role: "user",
            content: `Buatkan hook konten untuk topik: ${topic}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    res.status(200).json({ hook: result });
  } catch (error) {
    res.status(500).json({ error: "Gagal hubungi DeepSeek. Cek API Key di Vercel!" });
  }
}

