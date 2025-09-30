import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public/images/5g");
const output = path.join(process.cwd(), "data/5g.json");

const files = fs.readdirSync(dir);

const games = files.map((filename) => {
  const id = path.parse(filename).name;
  return {
    id,
    title: id.replace(/-/g, " "),
    imageUrl: `/images/5g/${filename}`,
  };
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(games, null, 2));

console.log(`✅ Generated ${games.length} entries to data/5g.json`);
