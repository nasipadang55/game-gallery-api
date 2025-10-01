const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Path ke folder public/images/5g
    const imagesFolder = path.join(process.cwd(), '/images/5g');
    const files = fs.readdirSync(imagesFolder);

    // Filter file gambar saja
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
    });

    // Buat data JSON
    const data = imageFiles.map(file => ({
      id: path.parse(file).name,
      title: path.parse(file).name,
      imageUrl: `/images/5g/${file}` // Bisa langsung diakses oleh browser
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
