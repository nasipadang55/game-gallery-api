// /api/5g.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dir = path.join(process.cwd(), "public/images/5g");

  // ambil semua nama file di folder
  const files = fs.readdirSync(dir);

  // mapping ke format JSON
  const games = files.map((filename) => {
    const id = path.parse(filename).name; // nama file tanpa ekstensi
    return {
      id,
      title: id.replace(/-/g, " "), // opsional: bikin judul dari nama file
      imageUrl: `/images/5g/${filename}`,
    };
  });

  res.status(200).json(games);
}
