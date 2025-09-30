const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const imagesBase = path.join(__dirname, '../images');

// Mapping folder -> provider name (ubah sesuai kebutuhan)
const providerMap = {
  pragmatic: 'Pragmatic Play',
  pgsoft: 'PG Soft',
  habanero: 'Habanero',
  spadegaming: 'Spadegaming',
  '5g': '5G'
};

// Helper: generate game list dari folder
function generateGames() {
  const allGames = [];
  Object.keys(providerMap).forEach(providerId => {
    const folderPath = path.join(imagesBase, providerId);
    if (!fs.existsSync(folderPath)) return;

    const files = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));

    files.forEach((file, index) => {
      allGames.push({
        id: `${providerId}${index+1}`,
        title: file.replace(/\.(png|jpg|jpeg|gif)$/i, '').replace(/[-_]/g, ' '),
        imageUrl: `/images/${providerId}/${file}`,
        provider: providerId,
        providerName: providerMap[providerId]
      });
    });
  });
  return allGames;
}

// GET all games
router.get('/', (req, res) => {
  const allGames = generateGames();
  res.json(allGames);
});

// GET games per provider
router.get('/:provider', (req, res) => {
  const providerId = req.params.provider;
  if (!providerMap[providerId]) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  const folderPath = path.join(imagesBase, providerId);
  if (!fs.existsSync(folderPath)) return res.json([]);

  const files = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));
  const games = files.map((file, index) => ({
    id: `${providerId}${index+1}`,
    title: file.replace(/\.(png|jpg|jpeg|gif)$/i, '').replace(/[-_]/g, ' '),
    imageUrl: `/images/${providerId}/${file}`,
    provider: providerId,
    providerName: providerMap[providerId]
  }));

  res.json(games);
});

// GET stats summary
router.get('/:provider/stats/summary', (req, res) => {
  const providerId = req.params.provider;
  if (!providerMap[providerId]) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  const folderPath = path.join(imagesBase, providerId);
  const totalGames = fs.existsSync(folderPath)
    ? fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f)).length
    : 0;

  res.json({ totalGames });
});

module.exports = router;
