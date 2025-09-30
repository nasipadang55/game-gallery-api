// api/5g.js
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const folder = path.join(__dirname, '../../images/5g');
  if (!fs.existsSync(folder)) return res.status(404).json({ error: 'Folder not found' });

  const files = fs.readdirSync(folder).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));
  const games = files.map((file, i) => ({
    id: `5g${i+1}`,
    title: file.replace(/\.(png|jpg|jpeg|gif)$/i,'').replace(/[-_]/g,' '),
    imageUrl: `/images/5g/${file}`,
    provider: '5g',
    providerName: '5G'
  }));

  res.status(200).json(games);
}
