const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const file = req.url.replace('/api/images/5g/', '');
  const filePath = path.join(__dirname, 'images/5g', file);

  if (!fs.existsSync(filePath)) {
    res.status(404).send('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif' };

  res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
};
