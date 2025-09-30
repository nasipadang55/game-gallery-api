
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const imagesBase = path.join(__dirname, '../images');
const providerMap = { pragmatic: 'Pragmatic Play', '5g': '5G' };

function generateGames(providerId) {
    if (providerId) {
        const folderPath = path.join(imagesBase, providerId);
        if (!fs.existsSync(folderPath)) return [];
        const files = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));
        return files.map((file, index) => ({
            id: `${providerId}${index+1}`,
            title: file.replace(/\.(png|jpg|jpeg|gif)$/i, '').replace(/[-_]/g, ' '),
            imageUrl: `/images/${providerId}/${file}`,
            provider: providerId,
            providerName: providerMap[providerId]
        }));
    }
    let allGames = [];
    Object.keys(providerMap).forEach(pid => { allGames = allGames.concat(generateGames(pid)); });
    return allGames;
}

router.get('/', (req, res) => { res.json(generateGames()); });
router.get('/:provider', (req, res) => {
    const providerId = req.params.provider.toLowerCase();
    if (!providerMap[providerId]) return res.status(404).json({ error: 'Provider not found' });
    res.json(generateGames(providerId));
});
router.get('/:provider/stats/summary', (req, res) => {
    const providerId = req.params.provider.toLowerCase();
    if (!providerMap[providerId]) return res.status(404).json({ error: 'Provider not found' });
    res.json({ totalGames: generateGames(providerId).length });
});

module.exports = router;
