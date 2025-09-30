const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Provider routes ===
const pragmatic = require('./api/pragmatic');
const pgsoft = require('./api/pgsoft');
const habanero = require('./api/habanero');
const spadegaming = require('./api/spadegaming');
const 5g = require('./api/5g');

app.use('/api/pragmatic', pragmatic);
app.use('/api/pgsoft', pgsoft);
app.use('/api/habanero', habanero);
app.use('/api/spadegaming', spadegaming);
app.use('/api/5g', 5g);


// Default route
app.get('/', (req, res) => {
  res.send({ message: 'Game Gallery API is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
