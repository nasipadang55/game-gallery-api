const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// API route
const allProviders = require('./api/allProviders');
app.use('/api', allProviders);

// Default route
app.get('/', (req, res) => {
  res.send({ message: 'Game Gallery API is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
