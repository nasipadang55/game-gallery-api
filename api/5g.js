const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Path ke folder gambar di public
    const imagesFolder = path.join(process.cwd(), 'public/images/5g');
    
    // Filter file gambar saja
    const files = fs.readdirSync(imagesFolder).filter(file => /\.(png|jpg|jpeg|gif)$/.test(file));

    // Buat array JSON
    const data = files.map(file => ({
      id: path.parse(file).name,
      title: path.parse(file).name,
      imageUrl: `/images/5g/${file}` // URL publik
    }));

    // Optional: update file JSON otomatis
    fs.writeFileSync(path.join(process.cwd(), 'data/5g.json'), JSON.stringify(data, null, 2));

    // Header CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Kirim response
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
