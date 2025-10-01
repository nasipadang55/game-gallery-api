const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Path ke folder gambar di public
    const imagesFolder = path.join(process.cwd(), 'public/images/5g');
    const files = fs.readdirSync(imagesFolder).filter(f => /\.(png|jpg|jpeg|gif)$/.test(f));

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
