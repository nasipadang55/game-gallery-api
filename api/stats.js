const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const providers = [
      'pragmatic', 'pgsoft', 'habanero', 'jili',
      'spadegaming', 'jokergaming', 'microgaming', 'hacksaw',
      'fastspin', 'nolimitcity', 'advantplay', 'playstar',
      'live22', 'cq9', 'sboslot', '5g'
    ];

    const statsPromises = providers.map(async provider => {
      const baseUrl = `https://sansserif.cloud/images/${provider}/`;
      const jsonUrl = `${baseUrl}index.json`;

      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error('Failed to fetch');

        const images = await response.json();
        return { provider, totalGames: images.length };
      } catch {
        return { provider, totalGames: 0 };
      }
    });

    const stats = await Promise.all(statsPromises);

    res.status(200).json(stats);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch stats' });
  }
};
