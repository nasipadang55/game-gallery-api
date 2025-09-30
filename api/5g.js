import games from "../data/5g.json" assert { type: "json" };

export default function handler(req, res) {
  res.status(200).json(games);
}
