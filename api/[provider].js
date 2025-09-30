const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', '*'); // izinkan semua origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Tangani preflight request
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { provider } = req.query;
    if (!provider) return res.status(400).json({ error: 'Provider not specified' });

    const validProviders = [
      'pragmatic', 'pgsoft', 'habanero', 'jili',
      'spadegaming', 'jokergaming', 'microgaming', 'hacksaw',
      'fastspin', 'nolimitcity', 'advantplay', 'playstar',
      'live22', 'cq9', 'sboslot', '5g'
    ];
    if (!validProviders.includes(provider)) return res.status(404).json({ error: 'Provider not found' });

    const baseUrl = `https://sansserif.cloud/image/${provider}/`;
    const jsonUrl = `${baseUrl}index.json`;

    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error('Failed to fetch provider JSON');

    const images = await response.json();

    const games = images.map(img => ({
      id: img.id || img.title.toLowerCase().replace(/\s+/g, '-'),
      title: img.title,
      imageUrl: img.imageUrl.startsWith('http') ? img.imageUrl : `${baseUrl}${img.imageUrl}`,
      provider: provider,
      providerName: img.providerName || provider
    }));

    res.status(200).json(games);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch provider images' });
  }
};
