const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Tangani preflight request
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Ambil provider dari query atau dari URL params
    const provider = req.query.provider || req.query['provider'] || req.params?.provider;
    if (!provider) return res.status(400).json({ error: 'Provider not specified' });

    // Daftar valid provider
    const validProviders = [
      'pragmatic', 'pgsoft', 'habanero', 'jili',
      'spadegaming', 'jokergaming', 'microgaming', 'hacksaw',
      'fastspin', 'nolimitcity', 'advantplay', 'playstar',
      'live22', 'cq9', 'sboslot', '5g'
    ];

    if (!validProviders.includes(provider)) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    // URL index.json di Namecheap
    const baseUrl = `https://game-gallery-api.vercel.app/image/${provider}/`;
    const jsonUrl = `${baseUrl}index.json`;

    // Fetch file JSON
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`Failed to fetch provider JSON: ${response.status}`);

    const images = await response.json();

    // Map ke format konsisten
    const games = images.map(img => ({
      id: img.id || (img.title ? img.title.toLowerCase().replace(/\s+/g, '-') : ''),
      title: img.title || 'No Title',
      imageUrl: img.imageUrl.startsWith('http') ? img.imageUrl : `${baseUrl}${img.imageUrl}`,
      provider,
      providerName: img.providerName || provider
    }));

    res.status(200).json(games);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch provider images' });
  }
};
