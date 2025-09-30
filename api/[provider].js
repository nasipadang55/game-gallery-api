// Daftar provider dan jumlah game (bisa disesuaikan sesuai jumlah file gambar di sansserif.cloud)
const providers = {
  "pragmatic-play": { name: "Pragmatic Play", count: 5 },
  "pgsoft": { name: "PG Soft", count: 5 },
  "habanero": { name: "Habanero", count: 5 },
  "jili": { name: "JILI", count: 5 },
  "spadegaming": { name: "Spadegaming", count: 5 },
  "jokergaming": { name: "Joker Gaming", count: 5 },
  "microgaming": { name: "Microgaming", count: 5 },
  "hacksaw": { name: "Hacksaw Gaming", count: 5 },
  "fastspin": { name: "FastSpin", count: 5 },
  "nolimitcity": { name: "Nolimit City", count: 5 },
  "advantplay": { name: "Advantplay", count: 5 },
  "playstar": { name: "PlayStar", count: 5 },
  "live22": { name: "Live22", count: 5 },
  "cq9": { name: "CQ9", count: 5 },
  "sboslot": { name: "1", count: 5 },
  "5g": { name: "5G", count: 5 }
};

// Base URL gambar (semua gambar ada di sansserif.cloud/images/<provider>/)
const IMAGE_BASE_URL = "https://sansserif.cloud/images";

export default function handler(req, res) {
  const { provider, stats } = req.query;

  // cek provider
  if (!providers[provider]) {
    return res.status(404).json({ error: "Provider not found" });
  }

  // jika minta stats
  if (stats === "summary") {
    return res.status(200).json({ totalGames: providers[provider].count });
  }

  // generate list game otomatis
  const games = Array.from({ length: providers[provider].count }).map((_, i) => ({
    id: `${provider}-${i + 1}`,
    title: `${providers[provider].name} Game ${i + 1}`,
    imageUrl: `${IMAGE_BASE_URL}/${provider}/${provider}${i + 1}.jpg`,
    provider,
    providerName: providers[provider].name
  }));

  return res.status(200).json(games);
}
