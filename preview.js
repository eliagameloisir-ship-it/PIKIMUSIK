// Cherche un extrait de 30 s sur Deezer pour une chanson (appelé par le jeu)
module.exports = async (req, res) => {
  const q = String(req.query.q || "").slice(0, 200);
  res.setHeader("Cache-Control", "no-store");
  try {
    const r = await fetch("https://api.deezer.com/search?limit=5&q=" + encodeURIComponent(q));
    const j = await r.json();
    const hit = (j.data || []).find((x) => x.preview);
    res.status(200).json({ url: hit ? hit.preview : null });
  } catch (e) {
    res.status(200).json({ url: null });
  }
};
