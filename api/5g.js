// /api/5g.js di Vercel
export default function handler(req, res) {
  const games = [
    {"id":"KYS-H5-99980","title":"Golden Island","imageUrl":"/images/5g/KYS-H5-99980.png"},
    {"id":"KYS-H5-99981","title":"Hammer of Vulcan","imageUrl":"/images/5g/KYS-H5-99981.png"},
    {"id":"KYS-H5-99982","title":"Gems Miner","imageUrl":"/images/5g/KYS-H5-99982.png"},
    // ... semua game lainnya
  ];

  res.status(200).json(games);
}
