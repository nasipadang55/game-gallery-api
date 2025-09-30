import fs from 'fs';
import path from 'path';

// Handler utama
export default async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { provider, filename } = req.query;

    const validProviders = [
      'pragmatic', 'pgsoft', 'habanero', 'jili',
      'spadegaming', 'jokergaming', 'microgaming', 'hacksaw',
      'fastspin', 'nolimitcity', 'advantplay', 'playstar',
      'live22', 'cq9', 'sboslot', '5g'
    ];

    if (!provider || !validProviders.includes(provider)) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const imagesFolder = path.join(process.cwd(), 'image', provider);

    if (!fs.existsSync(imagesFolder)) return res.status(404).json({ error: 'Images folder not found' });

    // Jika ada filename → kirim file gambar
    if (filename) {
      const filePath = path.join(imagesFolder, filename);

      if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
      };
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      const fileBuffer = fs.readFileSync(filePath);
      return res.status(200).send(fileBuffer);
    }

    // Jika tidak ada filename → kirim JSON daftar games
    const files = fs.readdirSync(imagesFolder).filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));

    const games = files.map((file, index) => ({
      id: `${provider}-${index + 1}`,
      title: `${provider.toUpperCase()} Game ${index + 1}`,
      imageUrl: `/api/${provider}/image/${file}`, // URL API untuk gambar
      provider,
      providerName: provider
    }));

    // Jika query stats/summary
    if (req.url.includes('/stats/summary')) {
      return res.status(200).json({
        provider,
        totalGames: games.length
      });
    }

    res.status(200).json(games);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch provider images' });
  }
}
