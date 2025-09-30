const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const imagesFolder = path.join(__dirname, '../public/images/5g');
    if (!fs.existsSync(imagesFolder)) {
      return res.status(404).json({ error: 'Folder tidak ditemukan' });
    }

    const files = fs.readdirSync(imagesFolder);
    const data = files.map(file => ({
      id: path.parse(file).name,
      title: path.parse(file).name,
      imageUrl: `/images/5g/${file}`
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
