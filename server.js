const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const imagesBase = path.join(__dirname, '../images');

// Mapping folder -> provider name
const providerMap = {
  pragmatic: 'Pragmatic Play',
  pgsoft: 'PG Soft',
  habanero: 'Habanero',
  spadegaming: 'Spadegaming'
};

// GET all games across providers
router.get('/', (req, res) => {
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

  res.json(allGames);
});

// GET stats summary
router.get('/stats/summary', (req, res) => {
  let totalGames = 0;
  Object.keys(providerMap).forEach(providerId => {
    const folderPath = path.join(imagesBase, providerId);
    if (!fs.existsSync(folderPath)) return;
    const count = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f)).length;
    totalGames += count;
  });

  res.json({ totalGames });
});

module.exports = router;
