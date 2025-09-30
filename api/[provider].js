import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Ambil provider dari query params
    const provider = req.query.provider;
    if (!provider) return res.status(400).json({ error: 'Provider not specified' });

    // Daftar provider valid
    const validProviders = [
      'pragmatic', 'pgsoft', 'habanero', 'jili',
      'spadegaming', 'jokergaming', 'microgaming', 'hacksaw',
      'fastspin', 'nolimitcity', 'advantplay', 'playstar',
      'live22', 'cq9', 'sboslot', '5g'
    ];

    if (!validProviders.includes(provider)) return res.status(404).json({ error: 'Provider not found' });

    // Path folder gambar di public
    const imagesFolder = path.join(process.cwd(), 'public', 'image', provider);

    if (!fs.existsSync(imagesFolder)) return res.status(404).json({ error: 'Images folder not found' });

    // Ambil semua file gambar
    const files = fs.readdirSync(imagesFolder).filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

    // Buat array game
    const games = files.map((file, index) => ({
      id: `${provider}-${index + 1}`,
      title: `${provider.toUpperCase()} Game ${index + 1}`,
      imageUrl: `/image/${provider}/${file}`, // langsung dari public folder
      provider,
      providerName: provider
    }));

    // Jika query /stats/summary, kembalikan stats
    if (req.url.includes('/stats/summary')) {
      return res.status(200).json({
        provider,
        totalGames: games.length
      });
    }

    // Kembalikan array games
    res.status(200).json(games);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch provider images' });
  }
}
