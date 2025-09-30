const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const providers = [
    { id: 'pragmatic', name: 'Pragmatic Play', endpoint: 'pragmatic' },
    { id: 'pgsoft', name: 'PG Soft', endpoint: 'pgsoft' },
    { id: 'habanero', name: 'Habanero', endpoint: 'habanero' },
    { id: 'jili', name: 'JILI', endpoint: 'jili' },
    { id: 'spadegaming', name: 'Spadegaming', endpoint: 'spadegaming' },
    { id: 'jokergaming', name: 'Joker Gaming', endpoint: 'jokergaming' },
    { id: 'microgaming', name: 'Microgaming', endpoint: 'microgaming' },
    { id: 'hacksaw', name: 'Hacksaw Gaming', endpoint: 'hacksaw' },
    { id: 'fastspin', name: 'FastSpin', endpoint: 'fastspin' },
    { id: 'nolimitcity', name: 'Nolimit City', endpoint: 'nolimitcity' },
    { id: 'advantplay', name: 'Advantplay', endpoint: 'advantplay' },
    { id: 'playstar', name: 'PlayStar', endpoint: 'playstar' },
    { id: 'live22', name: 'Live22', endpoint: 'live22' },
    { id: 'cq9', name: 'CQ9', endpoint: 'cq9' },
    { id: 'sboslot', name: 'SBO Slot', endpoint: 'sboslot' },
    { id: '5g', name: '5G', endpoint: '5g' }
];

app.get('/api/:provider', (req, res) => {
    const providerId = req.params.provider;
    const provider = providers.find(p => p.endpoint === providerId);

    if (!provider) return res.status(404).json({ error: 'Provider not found' });

    const filePath = path.join(__dirname, 'data', `${providerId}.json`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No data for this provider' });

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read data' });
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
