const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const imagesFolder = path.join(__dirname, 'images/5g');
    const files = fs.readdirSync(imagesFolder);

    // Filter file yang berformat gambar
    const imageExtensions = ['.png', '.webp', '.jpg', '.jpeg', '.gif'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    const data = imageFiles.map(file => ({
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
