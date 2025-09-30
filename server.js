const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

export default function handler(req, res) {
  const games = [
    { id: 'KYS-H5-99980', title: 'KYS-H5-99980', imageUrl: '/images/5g/KYS-H5-99980.png', provider: '5g', providerName: '5G' },
    { id: 'KYS-H5-99981', title: 'KYS-H5-99981', imageUrl: '/images/5g/KYS-H5-99981.png', provider: '5g', providerName: '5G' },
    { id: 'KYS-H5-99982', title: 'KYS-H5-99982', imageUrl: '/images/5g/KYS-H5-99982.png', provider: '5g', providerName: '5G' },
  ];

  res.status(200).json(games);
}


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
