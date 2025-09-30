const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const imagesFolder = path.join(__dirname, '../public/images/pragmatic');
  const files = fs.readdirSync(imagesFolder);

  const data = files.map(file => ({
    id: path.parse(file).name,
    title: path.parse(file).name,
    imageUrl: `/images/pragmatic/${file}`
  }));

  res.setHeader('Access-Control-Allow-Origin', '*'); // supaya bisa diakses dari domain lain
  res.json(data);
};
